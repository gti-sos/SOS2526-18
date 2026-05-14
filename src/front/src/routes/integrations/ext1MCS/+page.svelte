<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let loading = $state(true);
    let chart;

    let urlCountries = "/api/v2/proxy-countries";
    let urlFood = "/api/v2/food-supply-utilization-accounts";

    async function loadData() {
        if (!browser) return;

        try {
            const ApexCharts = (await import('apexcharts')).default;

            const [resCountries, resFood] = await Promise.all([
                fetch(urlCountries),
                fetch(urlFood)
            ]);

            const countries = await resCountries.json();
            const foodData = await resFood.json();

            const target = ["China", "Spain", "Egypt"];

            // Filtrado normal de países
            const selectedCountries = countries.filter(c =>
                target.includes(c.name)
            );

            const populationData = selectedCountries.map(c => c.population);

            // ✅ Importaciones con mejoras
            const importData = target.map(country => {

                const countryRecords = foodData.filter(f => {

                    const name = f.country_name_en.toLowerCase();

                    // 🔥 China más flexible
                    const isChina = country === "China"
                        ? name.includes("china")
                        : name === country.toLowerCase();

                    // ✅ Solo datos de 2020
                    return isChina && f.year === 2020;
                });

                const totalImports = countryRecords.reduce((sum, item) => {
                    const value = parseFloat(item.import_quantity_tonnes);
                    return sum + (isNaN(value) ? 0 : value);
                }, 0);

                return totalImports;
            });

            const options = {
                chart: {
                    type: 'area',
                    height: 600
                },
                series: [
                    {
                        name: "Población",
                        data: populationData
                    },
                    {
                        name: "Importaciones 2020 (toneladas)",
                        data: importData
                    }
                ],
                xaxis: {
                    categories: target,
                    title: { text: "País" }
                },
                yaxis: [
                    {
                        title: { text: "Población" }
                    },
                    {
                        opposite: true,
                        title: { text: "Importaciones 2020" }
                    }
                ],
                title: {
                    text: "China, España y Egipto (Población vs Importaciones 2020)",
                    align: "center"
                },
                stroke: {
                    curve: 'smooth'
                },
                tooltip: {
                    y: {
                        formatter: val => val.toLocaleString()
                    }
                },
                dataLabels: {
                    enabled: false
                }
            };

            loading = false;

            setTimeout(() => {
                chart = new ApexCharts(document.querySelector("#chart"), options);
                chart.render();
            }, 100);

        } catch (e) {
            console.error("Error cargando gráfico combinado:", e);
        }
    }

    onMount(loadData);
</script>

<main>
    <div class="chart-container">
        {#if loading}
            <div class="msg">Cargando datos 2020 (China flexible)...</div>
        {/if}
        <div id="chart"></div>
    </div>
</main>

<style>
    .chart-container {
        height: 600px;
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
