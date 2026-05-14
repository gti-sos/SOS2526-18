<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    const API_NVD = 'https://sos2526-18.onrender.com/api/v1/cost-of-healthy-diet-by-countries';
    const API_POPULATION = 'https://countriesnow.space/api/v0.1/countries/population';

    let loading = true;
    let errorMsg = '';

    const norm = s =>
        s ? s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim() : '';

    async function loadData() {
        if (!browser) return;
        try {
            const [resNvd, resPop] = await Promise.all([
                fetch(API_NVD),
                fetch(API_POPULATION)
            ]);

            if (!resNvd.ok) throw new Error('Error al acceder a la API de dietas');
            if (!resPop.ok) throw new Error('Error al acceder a CountriesNow');

            const dietData = await resNvd.json();
            const popJson  = await resPop.json();
            const popList  = popJson.data || [];

            if (!dietData || dietData.length === 0) {
                errorMsg = 'La API de dietas no tiene datos.';
                loading = false;
                return;
            }

            // Coste medio por país en mi API
            const costMap = {};
            dietData.forEach(d => {
                const key = norm(d.country);
                if (!costMap[key]) costMap[key] = { label: d.country, total: 0, count: 0 };
                if (d.cost_healthy_diet_ppp_usd != null) {
                    costMap[key].total += parseFloat(d.cost_healthy_diet_ppp_usd);
                    costMap[key].count++;
                }
            });

            // Población más reciente por país desde CountriesNow
            const popMap = {};
            popList.forEach(p => {
                const key = norm(p.country);
                const counts = p.populationCounts || [];
                if (counts.length > 0) {
                    // El último elemento es el más reciente
                    const last = counts[counts.length - 1];
                    popMap[key] = { value: last.value, year: last.year };
                }
            });

            // Cruzar
            const combined = [];
            Object.keys(costMap).forEach(key => {
                if (costMap[key].count === 0) return;
                const avgCost = costMap[key].total / costMap[key].count;
                const pop = popMap[key];
                combined.push({
                    name: costMap[key].label,
                    avgCost: parseFloat(avgCost.toFixed(2)),
                    population: pop ? pop.value : null,
                    popYear: pop ? pop.year : null
                });
            });

            if (combined.length === 0) {
                errorMsg = 'No se encontraron datos combinados.';
                loading = false;
                return;
            }

            combined.sort((a, b) => b.avgCost - a.avgCost);

            const Highcharts = (await import('highcharts')).default;
            const funnelMod  = await import('highcharts/modules/funnel.js');
            (funnelMod.default || funnelMod)(Highcharts);

            loading = false;

            setTimeout(() => {
                Highcharts.chart('chart-ext1', {
                    chart: {
                        type: 'pyramid',
                        backgroundColor: '#fff',
                        style: { fontFamily: 'Segoe UI, sans-serif' }
                    },
                    title: {
                        text: 'Coste Medio de Dieta Saludable por País',
                        align: 'center',
                        style: { fontSize: '16px', color: '#2d3748' }
                    },
                    subtitle: {
                        text: 'NVD API (coste dieta) + CountriesNow (población) | Ordenado de mayor a menor coste',
                        align: 'center',
                        style: { fontSize: '11px', color: '#718096' }
                    },
                    plotOptions: {
                        series: {
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b> — {point.y:.2f} USD/día',
                                softConnector: true,
                                style: { fontSize: '11px' }
                            },
                            center: ['45%', '50%'],
                            width: '52%'
                        }
                    },
                    tooltip: {
                        useHTML: true,
                        formatter: function () {
                            const d = combined.find(c => c.name === this.point.name);
                            const pop = d && d.population
                                ? `${(d.population / 1e6).toFixed(1)} M hab. (${d.popYear})`
                                : 'No disponible';
                            return `<b>${this.point.name}</b><br/>
                                    Coste dieta: <b>${this.y.toFixed(2)} USD PPP/día</b><br/>
                                    Población: <b>${pop}</b>`;
                        }
                    },
                    series: [{
                        name: 'Coste dieta (USD PPP/día)',
                        data: combined.map(d => [d.name, d.avgCost]),
                        colorByPoint: true
                    }],
                    credits: { enabled: false },
                    legend: { enabled: false }
                });
            }, 100);

        } catch (e) {
            errorMsg = 'Error: ' + e.message;
            loading = false;
        }
    }

    onMount(loadData);
</script>

<main class="container">
    <div class="header-info">
        <h2>Integración Externa 1 — Coste de Dieta × Población</h2>
        <p>
            Cruza el coste medio de una dieta saludable por país (mi API) con la
            población de cada país obtenida de <strong>CountriesNow</strong>,
            una API pública y gratuita sin autenticación. A mayor población,
            mayor escala de demanda alimentaria y más presión sobre los precios.
        </p>
    </div>

    <div id="chart-ext1" style="min-height:560px; background:white; border-radius:12px; border:1px solid #e2e8f0; display:flex; align-items:center; justify-content:center;">
        {#if loading}
            <p style="color:#718096;">⏳ Cargando datos...</p>
        {:else if errorMsg}
            <p style="color:#721c24; background:#f8d7da; padding:20px; border-radius:8px; margin:20px;">{errorMsg}</p>
        {/if}
    </div>

    <div class="info-box">
        <p><strong>APIs utilizadas:</strong></p>
        <ul>
            <li><strong>NVD API</strong> — Coste de dieta saludable por país y año (USD PPP/día)</li>
            <li>
                <strong>CountriesNow</strong>
                (<code>countriesnow.space/api/v0.1/countries/population</code>) —
                Población histórica por país. API pública, sin autenticación.
            </li>
        </ul>
        <p>
            <strong>Relación lógica:</strong> La densidad de población de un país
            afecta a la escala de su producción alimentaria y a la competencia
            por recursos, factores que repercuten directamente en el coste de
            una dieta saludable.
        </p>
        <p><strong>Gráfico:</strong> Pirámide (Highcharts Funnel/Pyramid).</p>
    </div>

    <div style="text-align:center; margin-top:20px;">
        <a href="/integrations" class="btn-back">← Volver a Integraciones</a>
    </div>
</main>

<style>
    .container {
        padding: 30px 20px;
        max-width: 960px;
        margin: 0 auto;
        font-family: 'Segoe UI', system-ui, sans-serif;
        color: #2d3748;
    }
    .header-info { margin-bottom: 24px; }
    .header-info h2 { font-size: 1.5rem; color: #1a202c; margin-bottom: 6px; }
    .header-info p { color: #718096; font-size: 0.95rem; }
    .info-box {
        margin-top: 24px;
        padding: 16px 20px;
        background: #f7fafc;
        border-left: 5px solid #4a90d9;
        border-radius: 4px;
        font-size: 0.9em;
        color: #4a5568;
    }
    .info-box ul { margin: 8px 0 8px 20px; padding: 0; }
    .info-box code { background: #edf2f7; padding: 2px 5px; border-radius: 3px; font-size: 0.85em; }
    .btn-back {
        display: inline-block;
        padding: 10px 22px;
        background: #2d3748;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        margin-top: 10px;
    }
    .btn-back:hover { background: #4a5568; }
</style>