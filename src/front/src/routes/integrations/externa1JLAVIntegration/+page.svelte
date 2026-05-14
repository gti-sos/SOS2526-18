<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let miApiUrl = "https://sos2526-18.onrender.com/api/v2/cereal-productions";
    let urlExterna = "https://restcountries.com/v3.1/region/europe?fields=name,population";

    let loading = true;
    let errorMsg = "";

    async function loadData() {
        if (!browser) return;
        try {
            const [resMe, resExt] = await Promise.all([ fetch(miApiUrl), fetch(urlExterna) ]);
            
            // Si la respuesta no es correcta, lanzamos error
            if (!resMe.ok) throw new Error("No se pudo acceder a tu API");

            let myData = await resMe.json();
            const extData = await resExt.json();

            // Si no hay datos en mi API, paramos y avisamos
            if (!myData || myData.length === 0) {
                loading = false;
                errorMsg = "La base de datos de tu API está vacía. No hay datos para mostrar.";
                return;
            }

            const normalizeName = (str) => str ? str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";

            // Cruzamos los datos de mi API con la externa
            let combinedData = myData.map(m => {
                const countryExt = extData.find(c => normalizeName(c.name.common) === normalizeName(m.country));
                if (countryExt) {
                    return {
                        label: `${m.country} (${m.year})`,
                        produccion: m.cereal_production,
                        poblacion: countryExt.population / 1000000 
                    };
                }
            }).filter(d => d !== undefined);

            if (combinedData.length > 0) {
                const module = await import('apexcharts');
                const ApexCharts = module.default;
                loading = false;
                setTimeout(() => renderChart(ApexCharts, combinedData), 200);
            } else {
                loading = false;
                errorMsg = "No se encontraron coincidencias entre los países de tu API y la API externa.";
            }
        } catch (e) {
            loading = false;
            errorMsg = "Error: " + e.message;
        }
    }

    function renderChart(ApexCharts, data) {
        const maxProd = Math.max(...data.map(d => d.produccion));
        const maxPob = Math.max(...data.map(d => d.poblacion));

        const options = {
            series: [
                { 
                    name: 'Producción (Relativa)', 
                    data: data.map(d => ((d.produccion / maxProd) * 100).toFixed(1)) 
                },
                { 
                    name: 'Población (Relativa)', 
                    data: data.map(d => ((d.poblacion / maxPob) * 100).toFixed(1)) 
                }
            ],
            chart: { 
                type: 'radar', 
                height: 550,
                toolbar: { show: false }
            },
            title: { 
                text: 'Comparativa Real: Producción vs Población', 
                align: 'center' 
            },
            xaxis: { 
                categories: data.map(d => d.label),
                labels: {
                    show: true,
                    style: { fontSize: '11px' }
                }
            },
            yaxis: { show: false, max: 100 },
            colors: ['#FEB019', '#00E396'],
            fill: { opacity: 0.4 },
            markers: { size: 4 },
            stroke: { width: 2 },
            tooltip: {
                y: {
                    formatter: function(value, { seriesIndex, dataPointIndex }) {
                        const original = data[dataPointIndex];
                        return seriesIndex === 0 
                            ? original.produccion.toLocaleString() + " Tn" 
                            : original.poblacion.toFixed(2) + " Millones";
                    }
                }
            }
        };

        const chartDiv = document.getElementById("chart-combined");
        if (chartDiv) {
            chartDiv.innerHTML = "";
            new ApexCharts(chartDiv, options).render();
        }
    }

    onMount(loadData);
</script>

<main class="container">
    <div id="chart-combined" style="min-height: 550px; background: white; border-radius: 12px; border: 1px solid #eee; display: flex; align-items: center; justify-content: center;">
        {#if loading} 
            <p>⏳ Cargando datos reales desde tu API...</p> 
        {:else if errorMsg} 
            <p style="color: #721c24; background: #f8d7da; padding: 20px; border-radius: 8px;">{errorMsg}</p> 
        {/if}
    </div>

    <div class="info-box">
        <p><strong>Uso de datos:</strong> Se muestran todos los registros cargados en mi api que coinciden con los registros de la API externa.</p>
    </div>

    <div style="text-align:center; margin-top:20px;">
        <a href="/integrations" class="btn-back">Volver al Índice</a>
    </div>
</main>

<style>
    .container { padding: 20px; max-width: 1000px; margin: 0 auto; font-family: sans-serif; }
    .info-box { margin-top: 20px; padding: 15px; background: #f8f9fa; border-left: 5px solid #2c3e50; font-size: 0.9em; }
    .btn-back { display: inline-block; padding: 10px 20px; background: #2c3e50; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; }
</style>