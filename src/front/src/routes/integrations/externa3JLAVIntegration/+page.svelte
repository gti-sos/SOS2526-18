<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let loading = $state(true);
    let miApiUrl = "https://sos2526-18.onrender.com/api/v2/cereal-productions";
    let urlProxySalud = "/api/v2/proxy-health"; // Tu puerta en el backend

    async function loadData() {
        if (!browser) return;
        try {
            const chartModule = await import('chart.js/auto');
            const Chart = chartModule.default;

            const [resMe, resHealth] = await Promise.all([ 
                fetch(miApiUrl), 
                fetch(urlProxySalud) 
            ]);
            
            const myData = await resMe.json();
            const healthData = await resHealth.json();

            // Formateamos los datos para el Bubble Chart
            const finalData = myData.map(m => {
                const countryMatch = healthData.find(h => 
                    h.country.toLowerCase() === m.country.toLowerCase()
                );

                let healthCases = 0;
                if (countryMatch && countryMatch.timeline) {
                    const yearShort = m.year.toString().slice(-2);
                    const dateKey = `12/31/${yearShort}`;
                    healthCases = countryMatch.timeline.cases[dateKey] || 0;
                }

                return {
                    x: healthCases,          // Eje X: Salud
                    y: m.cereal_production,  // Eje Y: Producción
                    r: m.cereal_production / 1000000, // Radio: Proporcional a la producción
                    label: `${m.country} (${m.year})`
                };
            }).filter(d => d.x > 0); // Solo mostramos si hay datos de salud

            loading = false;

            setTimeout(() => {
                const ctx = document.getElementById('myBubbleChart');
                new Chart(ctx, {
                    type: 'bubble',
                    data: {
                        datasets: [{
                            label: 'Cereales vs Casos Salud',
                            data: finalData,
                            backgroundColor: 'rgba(54, 162, 235, 0.5)',
                            borderColor: 'rgb(54, 162, 235)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top' },
                            title: { display: true, text: 'V2: Análisis de Resiliencia Agrícola (Cereales vs Salud)' },
                            tooltip: {
                                callbacks: {
                                    label: (context) => {
                                        const p = finalData[context.dataIndex];
                                        return `${p.label}: Casos ${p.x.toLocaleString()}, Prod ${p.y.toLocaleString()} Tn`;
                                    }
                                }
                            }
                        },
                        scales: {
                            x: { title: { display: true, text: 'Casos COVID Acumulados (Proxy)' } },
                            y: { title: { display: true, text: 'Producción de Cereales (Toneladas)' } }
                        }
                    }
                });
            }, 100);
        } catch (e) {
            console.error("Error cargando burbujas:", e);
        }
    }

    onMount(loadData);
</script>

<main>
    <div class="chart-container">
        {#if loading} <div class="msg">Cargando integración V2 con Proxy...</div> {/if}
        <canvas id="myBubbleChart"></canvas>
    </div>
    
    <div class="button-container">
        <a href="/integrations" class="btn-back">← Volver</a>
    </div>
</main>

<style>
    .chart-container { height: 600px; padding: 20px; background: #fff; border: 1px solid #ddd; border-radius: 8px; }
    .msg { text-align: center; margin-top: 100px; }
    .button-container { margin-top: 20px; text-align: center; }
    .btn-back { padding: 10px 20px; background: #2c3e50; color: white; text-decoration: none; border-radius: 5px; }
</style>