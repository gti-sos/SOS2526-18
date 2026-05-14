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

                //Cargamos ambas APIs
                const [resMe, resG15] = await Promise.all([ fetch(miApiUrl), fetch(g15ApiUrl) ]);
                const myData = await resMe.json();
                let densityData = resG15.ok ? await resG15.json() : [];

                // Función para quitar tildes y pasar a minúsculas
                const normalize = (str) => {
                    return str ? str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";
                }

                //Diccionario de traducción 
                const mapEnToEs = {
                    "spain": "espana",
                    "germany": "alemania",
                    "ukraine": "ucrania",
                    "france": "francia",
                    "italy": "italia"
                };

                //Cruzamos datos
                let chartPoints = myData.map(m => {
                    const myCountryClean = normalize(m.country);
                    
                    const d = densityData.find(den => {
                        const denCountryClean = normalize(den.country);
                        return den.year === m.year && (
                            denCountryClean === myCountryClean || 
                            denCountryClean === mapEnToEs[myCountryClean]
                        );
                    });
                    
                    if (d) {
                        const dens = parseFloat(d.density);
                        
                        // ASIGNACIÓN DE COLOR MANUAL
                        let puntoColor = '#00E396'; // Verde (Alta)
                        if (dens <= 85) puntoColor = '#FF4560';      // Rojo (Baja)
                        else if (dens <= 150) puntoColor = '#FEB019'; // Naranja (Media)

                        return {
                            x: `${m.country} (${m.year})`, 
                            y: m.cereal_production, 
                            value: dens,
                            fillColor: puntoColor 
                        };
                    }
                }).filter(p => p !== undefined);

                if (chartPoints.length > 0) renderChart(ApexCharts, chartPoints);
            } catch (e) { console.error("Error cargando datos:", e); }
        }
    }

    function renderChart(ApexCharts, points) {
        const options = {
            series: [{ data: points }],
            chart: { 
                height: 550, 
                type: 'treemap',
                toolbar: { show: false }
            },
            title: {
                text: 'Análisis de Producción de Cereales vs Densidad Poblacional (G18+G15)',
                align: 'center',
                style: {
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#2c3e50'
                }
            },
            stroke: { show: true, width: 2, colors: ['#fff'] },
            plotOptions: {
                treemap: {
                    enableShades: false, 
                }
            },
            dataLabels: {
                enabled: true,
                style: { fontSize: '14px', fontWeight: 'bold' }
            },
            tooltip: {
                custom: function({ series, seriesIndex, dataPointIndex, w }) {
                    const data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
                    return `
                        <div style="padding:10px; background:#fff; border:1px solid #ccc; color:#333;">
                            <b>${data.x}</b><br/>
                            <hr style="margin:5px 0;">
                             Prod: <b>${data.y.toLocaleString()} tn</b><br/>
                             Dens: <b>${data.value.toLocaleString()} hab/km²</b>
                        </div>
                    `;
                }
            }
        };

        const chartDiv = document.querySelector("#treemap-chart");
        if (chartDiv) {
            chartDiv.innerHTML = ''; 
            new ApexCharts(chartDiv, options).render();
        }
    }

    onMount(loadData);
</script>

<main class="container">
    <div id="treemap-chart"></div>
    
    <div class="info-box">
        <p><strong>Leyenda de Colores (Densidad Poblacional):</strong></p>
        <span style="color:#FF4560">■</span> Baja (&lt;85) | 
        <span style="color:#FEB019">■</span> Media (85-150) | 
        <span style="color:#00E396">■</span> Alta (&gt;150)

        <p style="margin-top: 10px;"><strong>Nota visual:</strong> El tamaño de cada cuadro representa la <strong>producción total en toneladas</strong>.</p>
    </div>

    <div class="button-container">
        <a href="/integrations" class="btn-back">Volver al Índice</a>
    </div>
</main>

<style>
    .container { padding: 20px; max-width: 1000px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
    
    #treemap-chart { background: white; border: 1px solid #eee; border-radius: 12px; min-height: 550px; padding: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
    
    .info-box { margin-top: 20px; padding: 15px; background: #fdfdfd; border: 1px solid #ddd; border-radius: 8px; font-size: 0.95em; line-height: 1.5; }
    
    .button-container { margin-top: 25px; text-align: center; }

    .btn-back { 
        display: inline-block; 
        padding: 12px 24px; 
        background: #2c3e50; 
        color: white; 
        text-decoration: none; 
        border-radius: 6px; 
        font-weight: bold;
        transition: background 0.3s ease;
    }

    .btn-back:hover { background: #34495e; }
</style>