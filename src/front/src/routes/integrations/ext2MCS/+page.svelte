<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let loading = $state(true);

    let urlCountries = "/api/v2/proxy-countries2";
    let urlFood = "https://sos2526-18.onrender.com/api/v2/food-supply-utilization-accounts";

    async function loadData() {
        if (!browser) return;

        try {
            const chartModule = await import('chart.js/auto');
            const Chart = chartModule.default;

            const [resCountries, resFood] = await Promise.all([
                fetch(urlCountries),
                fetch(urlFood)
            ]);

            const countriesData = await resCountries.json();
            const foodData = await resFood.json();

            // Países objetivo
            const mapping = [
                { name: "Spain", foodName: "Spain" },
                { name: "Egypt", foodName: "Egypt" },
                { name: "China", foodName: "China, mainland" }
            ];

            const finalData = mapping.map(m => {
                // Buscar fronteras
                const c = countriesData.find(c => c.name === m.name);
                const borders = c?.borders?.length || 0;

                // Filtrar imports en 2020
                const imports = foodData
                    .filter(f =>
                        f.country_name_en === m.foodName &&
                        f.year === 2020 &&
                        f.import_quantity_tonnes
                    )
                    .reduce((sum, f) => sum + Number(f.import_quantity_tonnes || 0), 0);

                return {
                    name: m.name,
                    imports: imports,
                    borders: borders
                };
            });

            const labels = finalData.map(d => d.name);
            const values = finalData.map(d => d.imports);

            const maxBorders = Math.max(...finalData.map(d => d.borders));

            // Colores según fronteras
            const colors = finalData.map(d => {
                const intensity = d.borders / maxBorders;
                return `rgba(255, ${150 - intensity * 120}, ${150 - intensity * 120}, 0.8)`;
            });

            loading = false;

            setTimeout(() => {
                const ctx = document.getElementById('comboChart');

                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Importaciones (toneladas)',
                            data: values,
                            backgroundColor: colors,
                            borderColor: '#fff',
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Importaciones vs Fronteras (2020)'
                            },
                            tooltip: {
                                callbacks: {
                                    label: (ctx) => {
                                        const d = finalData[ctx.dataIndex];
                                        return `${d.name}: ${d.imports.toFixed(2)} toneladas, ${d.borders} fronteras`;
                                    }
                                }
                            },
                            legend: {
                                position: 'top'
                            }
                        }
                    }
                });
            }, 100);

        } catch (e) {
            console.error("Error integración:", e);
        }
    }

    onMount(loadData);
</script>

<main>
    <div class="chart-container">
        {#if loading}
            <div class="msg">Cargando integración avanzada...</div>
        {/if}
        <canvas id="comboChart"></canvas>
    </div>
</main>

<style>
    .chart-container {
        height: 450px;
        padding: 20px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
    }

    .msg {
        text-align: center;
        margin-top: 100px;
    }
</style>