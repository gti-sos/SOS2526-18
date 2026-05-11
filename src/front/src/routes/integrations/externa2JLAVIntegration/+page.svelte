<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let loading = $state(true);
    let errorMsg = $state("");

    let miApiUrl = "https://sos2526-18.onrender.com/api/v2/cereal-productions";
    let urlBancoMundial = "https://api.worldbank.org/v2/country/all/indicator/AG.YLD.CREL.KG?format=json&per_page=1000&date=2022";

    function normalize(str) {
        if (!str) return "";
        return str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    async function loadData() {
        if (!browser) return;
        try {
            const chartModule = await import('chart.js/auto');
            const Chart = chartModule.default;

            const [resMe, resWB] = await Promise.all([ fetch(miApiUrl), fetch(urlBancoMundial) ]);
            let myData = await resMe.json();
            const wbDataRaw = await resWB.json();
            const wbData = wbDataRaw[1];

            const finalData = myData.map(m => {
                const match = wbData.find(wb => 
                    normalize(wb.country.value).includes(normalize(m.country)) || 
                    normalize(m.country).includes(normalize(wb.country.value))
                );
                return {
                    label: `${m.country} (${m.year})`,
                    miProduccion: m.cereal_production,
                    datoExterno: match && match.value ? match.value : 0
                };
            }).filter(d => d.miProduccion > 0);

            loading = false;

            setTimeout(() => {
                const ctx = document.getElementById('myChartJS');
                if (ctx) {
                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: finalData.map(d => d.label),
                            datasets: [
                                {
                                    label: 'Producción (Tn) - Eje Izq.',
                                    data: finalData.map(d => d.miProduccion),
                                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                                    borderColor: 'rgb(54, 162, 235)',
                                    borderWidth: 1,
                                    yAxisID: 'y'
                                },
                                {
                                    label: 'Rendimiento (kg/ha) - Eje Der.',
                                    data: finalData.map(d => d.datoExterno),
                                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                                    borderColor: 'rgb(255, 99, 132)',
                                    borderWidth: 1,
                                    yAxisID: 'y1'
                                }
                            ]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            scales: {
                                y: {
                                    type: 'linear',
                                    display: true,
                                    position: 'left',
                                    title: { display: true, text: 'Toneladas Totales' }
                                },
                                y1: {
                                    type: 'linear',
                                    display: true,
                                    position: 'right',
                                    grid: { drawOnChartArea: false },
                                    title: { display: true, text: 'Rendimiento kg/hectárea' }
                                }
                            },
                            plugins: {
                                title: { display: true, text: 'Cereales: Volumen vs Rendimiento (Doble Eje Y)' }
                            }
                        }
                    });
                }
            }, 100);

        } catch (e) {
            errorMsg = "Error: " + e.message;
            loading = false;
        }
    }

    onMount(loadData);
</script>

<main>
    <div class="chart-container">
        {#if loading} 
            <div class="msg">Cargando integración con Banco Mundial...</div> 
        {:else if errorMsg}
            <div class="msg" style="color: red;">{errorMsg}</div>
        {/if}
        <canvas id="myChartJS"></canvas>
    </div>

    <div class="button-container">
        <a href="/integrations" class="btn-back">
            ← Volver a Integraciones
        </a>
    </div>
</main>

<style>
    main {
        padding: 20px;
        font-family: sans-serif;
    }

    .chart-container { 
        height: 650px; 
        padding: 20px; 
        background: #fff; 
        border: 1px solid #ddd; 
        border-radius: 8px; 
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .msg { 
        text-align: center; 
        margin-top: 100px; 
        font-size: 1.2rem;
    }

    .button-container {
        margin-top: 30px;
        text-align: center;
    }

    .btn-back {
        display: inline-block;
        padding: 12px 24px;
        background-color: #2c3e50;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        transition: background-color 0.3s;
    }

    .btn-back:hover {
        background-color: #34495e;
    }
</style>