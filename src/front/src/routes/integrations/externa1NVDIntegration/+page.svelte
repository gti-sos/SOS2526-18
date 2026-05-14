<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    const API_NVD = 'https://sos2526-18.onrender.com/api/v1/cost-of-healthy-diet-by-countries';
    const API_POPULATION = 'https://countriesnow.space/api/v0.1/countries/population';

    let loading = true;
    let errorMsg = '';

    const norm = s =>
        s ? s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim() : '';

    const NAME_MAP = {
        'china, mainland': 'china',
        'united kingdom':  'united kingdom',
        'egypt':           'egypt',
        'brazil':          'brazil',
        'spain':           'spain',
    };

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

            // Coste medio por país
            const costMap = {};
            dietData.forEach(d => {
                const key = norm(d.country);
                if (!costMap[key]) costMap[key] = { label: d.country, total: 0, count: 0 };
                if (d.cost_healthy_diet_ppp_usd != null) {
                    costMap[key].total += parseFloat(d.cost_healthy_diet_ppp_usd);
                    costMap[key].count++;
                }
            });

            // Población más reciente
            const popMap = {};
            popList.forEach(p => {
                const key = norm(p.country);
                const counts = p.populationCounts || [];
                if (counts.length > 0) {
                    const last = counts[counts.length - 1];
                    popMap[key] = { value: last.value, year: last.year };
                }
            });

            // Cruzar: coste anual total nacional = coste diario × 365 × población
            const combined = [];
            Object.keys(costMap).forEach(key => {
                if (costMap[key].count === 0) return;
                const avgCost   = costMap[key].total / costMap[key].count;
                const mappedKey = NAME_MAP[key] || key;
                const pop       = popMap[mappedKey];
                if (!pop) return;
                const totalAnnualCost = parseFloat((avgCost * 365 * pop.value).toFixed(0));
                combined.push({
                    name:            costMap[key].label,
                    avgCost:         parseFloat(avgCost.toFixed(2)),
                    population:      pop.value,
                    popYear:         pop.year,
                    totalAnnualCost  // en USD
                });
            });

            if (combined.length === 0) {
                errorMsg = 'No se encontraron datos combinados.';
                loading = false;
                return;
            }

            combined.sort((a, b) => b.totalAnnualCost - a.totalAnnualCost);

            // Agrupar en sunburst por región
            const regions = {
                'América':  ['Brazil'],
                'Europa':   ['Spain', 'United Kingdom'],
                'Asia':     ['China, mainland'],
                'África':   ['Egypt'],
            };

            const sunburstData = Object.entries(regions).map(([region, countries]) => {
                const children = combined
                    .filter(d => countries.includes(d.name))
                    .map(d => ({
                        name:       d.name,
                        value:      d.totalAnnualCost,
                        avgCost:    d.avgCost,
                        population: d.population,
                        popYear:    d.popYear
                    }));
                const regionTotal = children.reduce((s, c) => s + c.value, 0);
                return {
                    name:     region,
                    value:    regionTotal,
                    children
                };
            }).filter(r => r.children.length > 0);

            const echarts = await import('echarts');
            loading = false;

            setTimeout(() => {
                const el = document.getElementById('chart-ext1');
                if (!el) return;
                const chart = echarts.init(el);

                chart.setOption({
                    backgroundColor: '#fff',
                    title: {
                        text: 'Gasto Nacional Total en Dieta Saludable',
                        subtext: 'Coste diario × 365 × Población | NVD API + CountriesNow',
                        left: 'center',
                        textStyle:    { fontSize: 16, color: '#2d3748' },
                        subtextStyle: { fontSize: 11, color: '#718096' }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: params => {
                            if (!params.data.children && params.data.value) {
                                const billions = (params.data.value / 1e9).toFixed(1);
                                const pop = (params.data.population / 1e6).toFixed(1);
                                return `<b>${params.data.name}</b><br/>
                                        Gasto nacional anual: <b>${billions} B USD</b><br/>
                                        Coste diario: <b>${params.data.avgCost} USD PPP/día</b><br/>
                                        Población: <b>${pop} M hab. (${params.data.popYear})</b>`;
                            }
                            const billions = (params.data.value / 1e9).toFixed(1);
                            return `<b>${params.data.name}</b><br/>Total región: <b>${billions} B USD</b>`;
                        }
                    },
                    series: [{
                        type: 'sunburst',
                        data: sunburstData,
                        radius: ['15%', '80%'],
                        emphasis: { focus: 'ancestor' },
                        levels: [
                            {},
                            {
                                r0: '15%', r: '45%',
                                label: { fontSize: 14, fontWeight: 'bold', rotate: 0 },
                                itemStyle: { borderWidth: 2 }
                            },
                            {
                                r0: '45%', r: '80%',
                                label: { fontSize: 11, rotate: 'radial' },
                                itemStyle: { borderWidth: 1 }
                            }
                        ]
                    }]
                });

                window.addEventListener('resize', () => chart.resize());
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
        <h2>Integración Externa 1 — Gasto Nacional en Dieta Saludable</h2>
        <p>
            Cruza el coste medio de una dieta saludable por país (mi API) con la
            población de cada país.
            El resultado es el gasto nacional anual estimado que
            supondría alimentar a toda la población con una dieta saludable
            (coste diario × 365 × población), en USD PPP.
        </p>
    </div>

    <div id="chart-ext1" style="height:560px; background:white; border-radius:12px; border:1px solid #e2e8f0;">
        {#if loading}
            <div style="display:flex; align-items:center; justify-content:center; height:560px;">
                <p style="color:#718096;"> Cargando datos...</p>
            </div>
        {:else if errorMsg}
            <div style="display:flex; align-items:center; justify-content:center; height:560px;">
                <p style="color:#721c24; background:#f8d7da; padding:20px; border-radius:8px; margin:20px;">{errorMsg}</p>
            </div>
        {/if}
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