<script>
    import { onMount } from 'svelte';
    import Highcharts from 'highcharts';

    let combinedData = [];
    // Tu API de Cereales
    let miApiUrl = "https://sos2526-18.onrender.com/api/v2/cereal-productions";
    // API del compañero
    let compañeroApiUrl = "https://soporte-sos.onrender.com/api/v1/aids-deaths-stats";

    async function loadData() {
        console.log("Cargando datos para la integración...");

        try {
            // 1. Fetch a tus datos (Cereales) - Filtramos por un país común, ej: Afganistán
            const resMe = await fetch(miApiUrl + "?country=Afghanistan");
            const myData = await resMe.json();

            // 2. Fetch a la API del compañero (SIDA)
            const resPeer = await fetch(compañeroApiUrl + "?country=Afghanistan");
            let peerData = [];
            if (resPeer.ok) {
                peerData = await resPeer.json();
            }

            // 3. Cruzar los datos por año (Regla de integración: comparar ambos datasets)
            // Buscamos años donde coincidan ambos para que la gráfica tenga sentido
            combinedData = myData.map(m => {
                const peerPoint = peerData.find(p => p.year === m.year);
                return {
                    year: m.year,
                    cerealProduction: m.production, // Ajusta si tu campo se llama distinto
                    aidsDeaths: peerPoint ? peerPoint.death_count_hiv_aids_15_49 : null
                };
            }).filter(d => d.aidsDeaths !== null); // Solo mostramos si hay datos de ambos

            if (combinedData.length > 0) {
                renderChart();
            } else {
                console.error("No se encontraron años comunes para el cruce de datos.");
            }
        } catch (error) {
            console.error("Error cargando las APIs:", error);
        }
    }

    function renderChart() {
        Highcharts.chart('chart-combined', {
            chart: {
                type: 'areaspline' // El estilo de curvas suaves que pediste
            },
            title: {
                text: 'Integración: Producción de Cereales vs Mortalidad VIH (Afganistán)'
            },
            xAxis: {
                categories: combinedData.map(d => d.year),
                title: { text: 'Año' }
            },
            yAxis: [
                { // Eje primario (Izquierda)
                    title: { text: 'Producción Cereales (Toneladas)', style: { color: '#2c3e50' } }
                }, 
                { // Eje secundario (Derecha)
                    title: { text: 'Muertes VIH (15-49 años)', style: { color: '#32CD32' } },
                    opposite: true
                }
            ],
            tooltip: { shared: true },
            plotOptions: {
                areaspline: {
                    fillColor: {
                        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                        stops: [
                            [0, '#32CD32'], // El verde "Live Data"
                            [1, 'rgba(50, 205, 50, 0)']
                        ]
                    },
                    marker: { enabled: true },
                    lineWidth: 3
                }
            },
            series: [
                {
                    name: 'Producción Cereales (Mis datos)',
                    data: combinedData.map(d => d.cerealProduction),
                    color: '#2c3e50',
                    dashStyle: 'ShortDash'
                },
                {
                    name: 'Muertes VIH (Datos Compañero)',
                    data: combinedData.map(d => d.aidsDeaths),
                    yAxis: 1, // Usar el eje de la derecha
                    color: '#32CD32'
                }
            ]
        });
    }

    onMount(loadData);
</script>

<main class="container">
    <header>
        <h1>Integración con Aids Deaths Stats</h1>
        <p>Comparativa entre la producción agrícola y el impacto de salud pública.</p>
    </header>

    <div id="chart-combined"></div>

   

    <a href="/integrations" class="btn-back">Volver al Índice</a>
</main>

<style>
    .container { padding: 40px; font-family: sans-serif; max-width: 1000px; margin: 0 auto; }
    header { text-align: center; margin-bottom: 30px; }
    #chart-combined { width: 100%; height: 500px; border-radius: 10px; border: 1px solid #eee; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .info { margin-top: 30px; background: #f9f9f9; padding: 15px; border-radius: 8px; font-size: 0.9rem; }
    .btn-back { display: inline-block; margin-top: 20px; padding: 10px 20px; background: #333; color: white; text-decoration: none; border-radius: 5px; }
</style>