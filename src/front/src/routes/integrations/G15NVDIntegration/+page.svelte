<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    const API_NVD = 'https://sos2526-18.onrender.com/api/v1/cost-of-healthy-diet-by-countries';
    const API_G15 = 'https://sos2526-15.onrender.com/api/v2/minimum-interprofessional-wages';

    let loading = true;
    let errorMsg = '';
    let chart;

    async function loadGraph() {
        try {
            const [resNvd, resG15] = await Promise.all([
                fetch(API_NVD),
                fetch(API_G15)
            ]);

            const dietData  = await resNvd.json();
            const wageData  = await resG15.json();

            if (!Array.isArray(dietData) || !Array.isArray(wageData)) {
                errorMsg = 'Formato de datos inesperado en una de las APIs.';
                loading = false;
                return;
            }

            // parseo de nombres de paises
            const norm = s =>
                s.toLowerCase()
                 .normalize('NFD').replace(/[\u0300-\u036f]/g, '')   // quitar tildes
                 .replace(/[^a-z0-9 ]/g, '')
                 .trim();

            // Agrupar dieta: { country → { year → avg_cost_ppp } }
            const dietMap = {};
            dietData.forEach(d => {
                if (!d.country || d.cost_healthy_diet_ppp_usd == null) return;
                const key = norm(d.country);
                if (!dietMap[key]) dietMap[key] = { label: d.country, years: {} };
                const yr = Number(d.year);
                if (!isNaN(yr)) {
                    const prev = dietMap[key].years[yr];
                    dietMap[key].years[yr] = prev
                        ? { sum: prev.sum + parseFloat(d.cost_healthy_diet_ppp_usd), n: prev.n + 1 }
                        : { sum: parseFloat(d.cost_healthy_diet_ppp_usd), n: 1 };
                }
            });

            // Agrupar salario mínimo: { country → { year → avg_wage } }
            const wageMap = {};
            wageData.forEach(w => {
                const rawCountry = w.country ; //|| w.country_name || w.name || '';
                if (!rawCountry) return;
                const rawWage = w.nmw_on_dollar //Cogemos el salario en dolares para comparar bien
                if (rawWage == null) return;
                const key = norm(rawCountry);
                if (!wageMap[key]) wageMap[key] = { label: rawCountry, years: {} };
                const yr = Number(w.date);
                if (!isNaN(yr) && yr > 0) {
                    const prev = wageMap[key].years[yr];
                    wageMap[key].years[yr] = prev
                        ? { sum: prev.sum + parseFloat(rawWage), n: prev.n + 1 }
                        : { sum: parseFloat(rawWage), n: 1 };
                }
            });

            // Cruzar países y años comunes
            const crossedPoints = []; // { country, year, diet, wage }
            const yearsSet = new Set();
            const countriesSet = new Set();

            Object.keys(dietMap).forEach(dKey => {
                const wKey = Object.keys(wageMap).find(wk =>
                    wk.includes(norm(dietMap[dKey].label.split(',')[0])) ||
                    norm(dietMap[dKey].label.split(',')[0]).includes(wk.split(' ')[0]) ||
                    dKey === wk
                );
                if (!wKey) return;

                const dietYears = dietMap[dKey].years;
                const wageYears = wageMap[wKey].years;

                Object.keys(dietYears).forEach(yr => {
                    if (wageYears[yr]) {
                        const avgDiet = dietYears[yr].sum / dietYears[yr].n;
                        const avgWage = wageYears[yr].sum / wageYears[yr].n;
                        crossedPoints.push({
                            country: dietMap[dKey].label,
                            year: Number(yr),
                            diet: parseFloat(avgDiet.toFixed(2)),
                            wage: parseFloat(avgWage.toFixed(2))
                        });
                        yearsSet.add(Number(yr));
                        countriesSet.add(dietMap[dKey].label);
                    }
                });
            });

            if (crossedPoints.length === 0) {
                errorMsg = 'No se encontraron países/años en común entre las dos APIs.';
                loading = false;
                return;
            }

            // Ordenar ejes
            const years     = Array.from(yearsSet).sort((a, b) => a - b);
            const countries = Array.from(countriesSet).sort();

            // Calcular "asequibilidad": % del salario diario que supone la dieta
            // wage suele ser mensual → wage_daily = wage / 30
            // affordability = (diet / (wage/30)) * 100  → % del ingreso diario
            const heatData = []; // [xIdx (year), yIdx (country), value]
            crossedPoints.forEach(p => {
                const xi = years.indexOf(p.year);
                const yi = countries.indexOf(p.country);
                const wageDailyApprox = p.wage / 30;
                const affordability = wageDailyApprox > 0
                    ? parseFloat(((p.diet / wageDailyApprox) * 100).toFixed(1))
                    : null;
                if (affordability !== null && affordability < 200) {   // filtrar outliers extremos
                    heatData.push([xi, yi, affordability]);
                }
            });

            // ---------- montar eCharts ----------
            const echarts = await import('echarts');
            const ec = echarts.default || echarts;

            const container = document.getElementById('container-g15nvd');
            if (chart) chart.dispose();
            chart = ec.init(container);

            const option = {
                title: {
                    text: 'Asequibilidad de la Dieta Saludable vs Salario Mínimo',
                    subtext: '% del salario diario estimado que cuesta la dieta saludable por día (PPP)',
                    left: 'center',
                    textStyle: { fontSize: 16 }
                },
                tooltip: {
                    position: 'top',
                    formatter: params => {
                        const country = countries[params.data[1]];
                        const year    = years[params.data[0]];
                        const val     = params.data[2];
                        return `<b>${country}</b><br/>Año: ${year}<br/>Coste dieta: <b>${val}%</b> del ingreso diario`;
                    }
                },
                grid: {
                    left: '15%',
                    right: '10%',
                    top: '15%',
                    bottom: '12%'
                },
                xAxis: {
                    type: 'category',
                    data: years.map(String),
                    name: 'Año',
                    nameLocation: 'middle',
                    nameGap: 30,
                    splitArea: { show: true }
                },
                yAxis: {
                    type: 'category',
                    data: countries,
                    splitArea: { show: true },
                    axisLabel: { fontSize: 11 }
                },
                visualMap: {
                    min: 0,
                    max: 100,
                    calculable: true,
                    orient: 'horizontal',
                    left: 'center',
                    bottom: '0%',
                    inRange: {
                        color: ['#1a9850', '#a6d96a', '#fee08b', '#f46d43', '#d73027']
                    },
                    text: ['100% (caro)', '0% (asequible)']
                },
                series: [{
                    name: 'Asequibilidad (%)',
                    type: 'heatmap',
                    data: heatData,
                    label: {
                        show: heatData.length < 60,
                        formatter: p => p.data[2] + '%',
                        fontSize: 9
                    },
                    emphasis: {
                        itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.5)' }
                    }
                }]
            };

            chart.setOption(option);
            window.addEventListener('resize', () => chart && chart.resize());
            loading = false;

        } catch (err) {
            console.error('Error cargando datos:', err);
            errorMsg = 'Error al cargar los datos. Revisa la consola para más detalles.';
            loading = false;
        }
    }

    onMount(() => {
        if (browser) loadGraph();
        loading = false;
    });

    loading = false;
</script>

<main>
    <h2>Integración G15 × NVD</h2>
    <p class="subtitle">
        <strong>Coste dieta saludable</strong> (G18 – NVD, USD PPP/día)
        cruzado con
        <strong>Salario Mínimo Interprofesional</strong> (G15, USD/mes).
        El mapa de calor muestra qué porcentaje del ingreso diario estimado
        representa el coste de una dieta saludable en cada país y año.
        <em>Verde = asequible · Rojo = muy caro en relación al salario.</em>
    </p>

    <div
        id="container-g15nvd"
        style="width: 100%; height: 560px; border: 1px solid #ccc; background: white; border-radius: 8px;"
    ></div>

    <div class="info">
        <p>
            Fuentes: API G18-NVD (<code>cost-of-healthy-diet-by-countries</code>) ·
            API G15 (<code>minimum-interprofessional-wages</code>).
        </p>
        <a href="/integrations"><button class="btn-volver">← Volver</button></a>
    </div>
</main>

<style>
    main {
        padding: 40px;
        text-align: center;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        max-width: 1100px;
        margin: 0 auto;
    }
    h2 {
        font-size: 1.8rem;
        color: #1a202c;
        margin-bottom: 10px;
    }
    .subtitle {
        color: #4a5568;
        font-size: 0.95rem;
        margin-bottom: 24px;
        line-height: 1.6;
    }
    .loading, .error {
        padding: 16px;
        margin-bottom: 16px;
        border-radius: 8px;
        font-size: 1rem;
    }
    .loading { background: #ebf8ff; color: #2b6cb0; }
    .error   { background: #fff5f5; color: #c53030; }
    .info {
        margin-top: 24px;
        color: #718096;
        font-size: 0.9rem;
    }
    .info code {
        background: #edf2f7;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 0.85rem;
    }
    .btn-volver {
        margin-top: 12px;
        padding: 10px 24px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 15px;
    }
    .btn-volver:hover {
        background-color: #0056b3;
    }
</style>