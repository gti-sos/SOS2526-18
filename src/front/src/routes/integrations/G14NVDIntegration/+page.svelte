<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let Highcharts;

    async function loadGraph() {
        try {
            const resDiet   = await fetch("https://sos2526-18.onrender.com/api/v1/cost-of-healthy-diet-by-countries");
            const resLaunch = await fetch("https://sos2526-14-yjus.onrender.com/api/v2/space-launches?limit=200&offset=0");

            const dietData   = await resDiet.json();
            const launchData = await resLaunch.json();

            const validDiet = dietData.filter(d =>
                d.country &&
                d.cost_healthy_diet_ppp_usd !== undefined &&
                d.cost_healthy_diet_ppp_usd !== null &&
                !isNaN(parseFloat(d.cost_healthy_diet_ppp_usd))
            );

            if (validDiet.length === 0 || launchData.length === 0) return;

            const launchByCountry = {};
            launchData.forEach(r => {
                const country = r.country || r.launch_country || r.agency_country;
                if (country && country !== "Unknown") {
                    launchByCountry[country] = (launchByCountry[country] || 0) + 1;
                }
            });

            const dietByCountry = {};
            validDiet.forEach(d => {
                const c = d.country;
                if (!dietByCountry[c]) dietByCountry[c] = { sum: 0, count: 0 };
                dietByCountry[c].sum   += parseFloat(d.cost_healthy_diet_ppp_usd);
                dietByCountry[c].count += 1;
            });

            const norm = s => s.toLowerCase().replace(/[,.]/g, "").trim();

            const crossed = Object.keys(dietByCountry).map(dc => {
                const matchKey = Object.keys(launchByCountry).find(lc =>
                    norm(lc).includes(norm(dc)) || norm(dc).includes(norm(lc))
                );
                if (!matchKey) return null;
                const avgCost  = dietByCountry[dc].sum / dietByCountry[dc].count;
                const launches = launchByCountry[matchKey];
                return { name: dc, y: parseFloat(avgCost.toFixed(2)), z: launches };
            }).filter(p => p !== null && p.z > 0);

            if (crossed.length === 0) return;

            crossed.sort((a, b) => b.y - a.y);

            Highcharts.chart('container-g14', {
                chart: { type: 'variwide' },
                title: { text: 'Integración G18 (Dieta) + G14 (Lanzamientos Espaciales)' },
                subtitle: { text: 'Altura = coste dieta saludable (USD PPP/día) · Anchura = nº lanzamientos espaciales (muestra 200)' },
                xAxis: {
                    type: 'category',
                    title: { text: 'País' },
                    labels: { rotation: -35, style: { fontSize: '11px' } }
                },
                yAxis: {
                    min: 0,
                    title: { text: 'Coste dieta saludable (USD PPP / día)' },
                    labels: { format: '${value:.2f}' }
                },
                tooltip: {
                    headerFormat: '',
                    pointFormat: '<b>{point.name}</b><br/>' +
                                 'Coste dieta: <b>${point.y:.2f} USD PPP/día</b><br/>' +
                                 'Lanzamientos espaciales: <b>{point.z}</b>'
                },
                legend: { enabled: false },
                series: [{
                    name: 'País',
                    data: crossed.map(p => [p.name, p.y, p.z]),
                    dataLabels: {
                        enabled: true,
                        formatter: function () { return '$' + this.y.toFixed(2); },
                        style: { fontSize: '10px', color: '#fff', textOutline: 'none' }
                    },
                    borderWidth: 0,
                    borderRadius: 3
                }],
                credits: { enabled: false }
            });

        } catch (error) {
            console.error("Error al cargar los datos en el gráfico:", error);
        }
    }

    onMount(async () => {
        if (browser) {
            try {
                const HC = await import('highcharts');
                Highcharts = HC.default || HC;

                const HC_variwide_module = await import('highcharts/modules/variwide');
                const initVariwide = HC_variwide_module.default || HC_variwide_module;

                if (typeof initVariwide === 'function') {
                    initVariwide(Highcharts);
                } else {
                    console.error("No se pudo cargar Highcharts-Variwide como función");
                }

                loadGraph();
            } catch (e) {
                console.error("Error crítico inicializando Highcharts:", e);
            }
        }
    });
</script>

<main>
    <h2>Integración G18 (Dieta Saludable) + G14 (Lanzamientos Espaciales)</h2>

    <div id="container-g14" style="width: 100%; height: 500px; border: 1px solid #ccc; background: white; border-radius: 8px;"></div>

    <div class="info">
        <p>Países con datos en ambas APIs. Altura = coste dieta (USD PPP/día), anchura = nº lanzamientos espaciales.</p>
        <a href="/integrations"><button class="btn-volver">Volver</button></a>
    </div>
</main>

<style>
    main {
        padding: 40px;
        text-align: center;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .info {
        margin-top: 20px;
        color: #666;
    }
    .btn-volver {
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
    }
    .btn-volver:hover {
        background-color: #0056b3;
    }
</style>