<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let miApiUrl = "https://sos2526-18.onrender.com/api/v2/cereal-productions";
    let g15ApiUrl = "https://sos2526-15-1.onrender.com/api/v1/population-densities";

    async function loadData() {
        if (browser) {
            try {
                const module = await import('apexcharts');
                const ApexCharts = module.default;

                // 1. Cargamos tus datos
                const resMe = await fetch(miApiUrl + "?country=Spain");
                const myData = await resMe.json();
                
                // 2. Cargamos datos del compañero
                const resG15 = await fetch(g15ApiUrl + "?country=españa");
                let densityData = [];
                if (resG15.ok) { densityData = await resG15.json(); }

                // 3. Cruzamos datos
                let chartPoints = myData.map(m => {
                    const d = densityData.find(den => den.year === m.year);
                    if (d) {
                        return {
                            // CAMBIO AQUÍ: Ahora incluye el País y el Año
                            x: `${m.country} (${m.year})`, 
                            y: m.cereal_production, 
                            value: parseFloat(d.density) 
                        };
                    }
                }).filter(p => p !== undefined);

                if (chartPoints.length > 0) {
                    renderChart(ApexCharts, chartPoints);
                }
            } catch (e) {
                console.error("Error cargando integración:", e);
            }
        }
    }

    function renderChart(ApexCharts, points) {
        const options = {
            series: [{ data: points }],
            chart: { 
                height: 500, 
                type: 'treemap',
                toolbar: { show: false } // Menú oculto
            },
            title: { 
                text: 'Producción de Cereales vs Densidad Poblacional',
                align: 'center'
            },
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '14px', // Un poco más pequeña para que quepa "Spain (2022)"
                    fontWeight: 'bold',
                }
            },
            plotOptions: {
                treemap: {
                    enableShades: true,
                    shadeIntensity: 0.8,
                    colorScale: {
                        ranges: [
                            { from: 0, to: 91, color: '#FF4560', name: 'Densidad Baja' },
                            { from: 91.001, to: 1000, color: '#00E396', name: 'Densidad Alta' }
                        ]
                    }
                }
            },
            tooltip: {
                custom: function({ series, seriesIndex, dataPointIndex, w }) {
                    const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
                    return `
                        <div style="padding: 10px; background: #fff; border: 1px solid #ccc; border-radius: 5px;">
                            <b style="font-size: 14px;">${data.x}</b><br/>
                            <hr style="margin: 5px 0;">
                            <span>🌾 Producción: <b>${data.y.toLocaleString()} tn</b></span><br/>
                            <span>👥 Densidad: <b style="color:#007bff;">${data.value} hab/km²</b></span>
                        </div>
                    `;
                }
            }
        };

        const chartDiv = document.querySelector("#treemap-chart");
        if (chartDiv) {
            chartDiv.innerHTML = ''; 
            const chart = new ApexCharts(chartDiv, options);
            chart.render();
        }
    }

    onMount(loadData);
</script>

<main class="container">
    <div id="treemap-chart"></div>
    
    <div class="info-box">
        <p><strong>Integración G18 + G15:</strong></p>
        <p>Cada cuadro muestra el <strong>País y Año</strong>. El tamaño indica la producción y el color la densidad poblacional.</p>
    </div>

    <div style="margin-top: 20px;">
        <a href="/integrations" class="btn-back">Volver al Índice</a>
    </div>
</main>

<style>
    .container { padding: 30px; max-width: 950px; margin: 0 auto; font-family: sans-serif; }
    #treemap-chart { background: white; border: 1px solid #eee; border-radius: 10px; min-height: 500px; padding: 10px; }
    .info-box { margin-top: 20px; padding: 15px; background: #f4f4f4; border-left: 5px solid #333; text-align: left; }
    .btn-back { display: inline-block; padding: 10px 20px; background: #333; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; }
</style>