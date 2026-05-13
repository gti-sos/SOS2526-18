<script>
    import { onMount } from 'svelte';
    import Highcharts from 'highcharts';

    let combinedData = [];
    let miApiUrl = "https://sos2526-18.onrender.com/api/v2/cereal-productions";
    let compañeroApiUrl = "https://soporte-sos.onrender.com/api/v1/aids-deaths-stats";

    async function loadData() {
        try {
            const resMe = await fetch(miApiUrl + "?country=Afghanistan");
            const myData = await resMe.json();
            const resPeer = await fetch(compañeroApiUrl + "?country=Afghanistan");
            let peerData = [];
            if (resPeer.ok) { peerData = await resPeer.json(); }

            combinedData = myData.map(m => {
                const p = peerData.find(p => p.year === m.year);
                const totalDeaths = p ? (
                    (p.death_count_hiv_aids_under_5 || 0) +
                    (p.death_count_hiv_aids_5_14 || 0) +
                    (p.death_count_hiv_aids_15_49 || 0) +
                    (p.death_count_hiv_aids_50_69 || 0) +
                    (p.death_count_hiv_aids_70_plus || 0)
                ) : null;
                return {
                    year: m.year,
                    cerealProduction: m.cereal_production, 
                    aidsDeaths: totalDeaths
                };
            }).filter(d => d.aidsDeaths !== null && d.cerealProduction !== undefined);

            combinedData.sort((a, b) => a.year - b.year);
            if (combinedData.length > 0) { renderChart(); }
        } catch (error) { console.error("Error cargando datos:", error); }
    }

    function renderChart() {
        Highcharts.chart('chart-combined', {
            chart: { type: 'area' },
            title: { text: 'Integración G18 (Cereales) vs G21 (SIDA Total) - Afganistán' },
            xAxis: {
                categories: combinedData.map(d => d.year),
                title: { text: 'Año' }
            },
            yAxis: [
                { // Eje Izquierdo (Cereales)
                    title: { text: 'Producción Cereales (Toneladas)', style: { color: '#2c3e50' } },
                    labels: { style: { color: '#2c3e50' } },
                    min: 0
                }, 
                { // Eje Derecho (SIDA)
                    title: { text: 'Mortalidad VIH Total', style: { color: '#32CD32' } },
                    labels: { style: { color: '#32CD32' } },
                    opposite: true,
                    min: 0
                }
            ],
            tooltip: { shared: true },
            plotOptions: {
                area: {
                    marker: { enabled: true, radius: 4 },
                    lineWidth: 2
                }
            },
            series: [
                {
                    name: 'Mortalidad VIH (G21 - Fondo)',
                    type: 'areaspline',
                    data: combinedData.map(d => d.aidsDeaths),
                    yAxis: 1,
                    color: '#32CD32', // Borde verde
                    // NUEVA OPACIDAD: 0.6 (Se notará mucho más el color verde)
                    fillColor: 'rgba(50, 205, 50, 0.6)', 
                    zIndex: 0 // <--- FUNDAMENTAL: Se dibuja DETRÁS
                },
                {
                    name: 'Producción Cereales (G18 - Delante)',
                    type: 'area',
                    data: combinedData.map(d => d.cerealProduction),
                    yAxis: 0,
                    color: '#2c3e50', // Gris azulado oscuro
                    // Un gris azulado con 0.7 de opacidad, para que sea sólido
                    fillColor: 'rgba(44, 62, 80, 0.7)', 
                    zIndex: 1 // <--- FUNDAMENTAL: Se dibuja DELANTE
                }
            ]
        });
    }

    onMount(loadData);
</script>

<main class="container">
    <h1>Análisis de Integración (G18 + G21)</h1>
    <div id="chart-combined"></div>
    <a href="/integrations" class="btn-back">Volver al Índice</a>
</main>

<style>
    .container { padding: 40px; max-width: 1100px; margin: 0 auto; text-align: center; font-family: sans-serif;}
    h1 { margin-bottom: 20px; color: #333; }
    #chart-combined { width: 100%; height: 550px; border-radius: 12px; border: 1px solid #ddd; box-shadow: 0 4px 10px rgba(0,0,0,0.1); background: white;}
    .btn-back { display: inline-block; margin-top: 20px; padding: 10px 20px; background: #333; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;}
    .btn-back:hover { background: #555; }
</style>