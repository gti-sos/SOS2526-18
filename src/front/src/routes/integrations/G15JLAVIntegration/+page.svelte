<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let miApiUrl = "https://sos2526-18.onrender.com/api/v2/cereal-productions";
    let g15ApiUrl = "https://sos2526-15-1.onrender.com/api/v1/population-densities";

    async function loadData() {
        if (browser) {
            try {
                // Importación dinámica de ApexCharts
                const module = await import('apexcharts');
                const ApexCharts = module.default;

                const resMe = await fetch(miApiUrl + "?country=Spain");
                const myData = await resMe.json();
                const resG15 = await fetch(g15ApiUrl + "?country=españa");
                let densityData = [];
                if (resG15.ok) { densityData = await resG15.json(); }

                // Formateamos los puntos para el Treemap
                // x: nombre del cuadro, y: valor numérico
                let chartPoints = myData.map(m => {
                    const d = densityData.find(den => den.year === m.year);
                    if (d) {
                        return {
                            x: `${m.year}`,
                            y: d.density // Usamos la densidad para el valor/color
                        };
                    }
                }).filter(p => p !== undefined).slice(-10);

                if (chartPoints.length > 0) {
                    renderChart(ApexCharts, chartPoints);
                } else {
                    console.warn("No hay datos combinados para mostrar.");
                }
            } catch (e) {
                console.error("Error cargando ApexCharts o datos:", e);
            }
        }
    }

    function renderChart(ApexCharts, points) {
        const options = {
            series: [{
                data: points
            }],
            legend: { show: false },
            chart: {
                height: 450,
                type: 'treemap'
            },
            title: {
                text: 'Integración G18 + G15: Treemap de Densidad Poblacional',
                align: 'center'
            },
            plotOptions: {
                treemap: {
                    enableShades: true,
                    shadeIntensity: 0.5,
                    colorScale: {
                        ranges: [
                            { from: 0, to: 91, color: '#CD363A' },     // Densidad baja (Rojo)
                            { from: 91.001, to: 500, color: '#52B12C' } // Densidad alta (Verde)
                        ]
                    }
                }
            }
        };

        // Buscamos el elemento y renderizamos
        const chartElement = document.querySelector("#treemap-chart");
        if (chartElement) {
            chartElement.innerHTML = ''; // Limpiamos por si acaso
            const chart = new ApexCharts(chartElement, options);
            chart.render();
        }
    }

    onMount(loadData);
</script>

<main class="container">
    <div id="treemap-chart" style="min-height: 450px;"></div>
    
    <div class="info">
        <p>Cada cuadro representa un año. El color indica el rango de densidad poblacional (G15).</p>
    </div>
    
    <div style="margin-top: 20px;">
        <a href="/integrations" class="btn-back">Volver</a>
    </div>
</main>

<style>
    .container { 
        padding: 40px; 
        text-align: center; 
        max-width: 900px; 
        margin: 0 auto; 
    }
    #treemap-chart { 
        background: #fdfdfd; 
        border: 1px solid #eee; 
        border-radius: 8px;
        padding: 10px;
    }
    .info { margin-top: 20px; color: #666; font-style: italic; }
    .btn-back { 
        display: inline-block; 
        padding: 10px 20px; 
        background: #333; 
        color: white; 
        text-decoration: none; 
        border-radius: 5px; 
    }
</style>