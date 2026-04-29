<script>
    import Highcharts from 'highcharts';
    import { onMount } from 'svelte';

    onMount(async () => {
        const Highcharts = (await import('highcharts')).default;

        let apiData = [];
        try {
            const res = await fetch('/api/v1/cost-of-healthy-diet-by-countries');
            apiData = res.ok ? await res.json() : [];
        } catch (e) {
            console.error('Error cargando API cost-of-healthy-diet', e);
        }

        // Fallback con datos reales si la API falla
        const finalData = apiData.length > 0 ? apiData : [
            { country: 'Spain', year: 2017, cost_healthy_diet_ppp_usd: 2.53, cost_vegetables_ppp_usd: 0.79, cost_fruits_ppp_usd: 0.56 },
            { country: 'Spain', year: 2020, cost_healthy_diet_ppp_usd: 2.75, cost_vegetables_ppp_usd: 0.71, cost_fruits_ppp_usd: 0.67 },
            { country: 'Spain', year: 2022, cost_healthy_diet_ppp_usd: 3.40, cost_vegetables_ppp_usd: 0.76, cost_fruits_ppp_usd: 0.70 },
            { country: 'China, mainland', year: 2020, cost_healthy_diet_ppp_usd: 3.25, cost_vegetables_ppp_usd: 0.81, cost_fruits_ppp_usd: 0.68 },
            { country: 'China, mainland', year: 2022, cost_healthy_diet_ppp_usd: 3.41, cost_vegetables_ppp_usd: 0.74, cost_fruits_ppp_usd: 0.63 },
            { country: 'Egypt', year: 2020, cost_healthy_diet_ppp_usd: 3.88, cost_vegetables_ppp_usd: 0.79, cost_fruits_ppp_usd: 0.73 },
            { country: 'Egypt', year: 2022, cost_healthy_diet_ppp_usd: 4.69, cost_vegetables_ppp_usd: 0.86, cost_fruits_ppp_usd: 0.69 },
            { country: 'Brazil', year: 2020, cost_healthy_diet_ppp_usd: 3.69, cost_vegetables_ppp_usd: 0.78, cost_fruits_ppp_usd: 0.61 },
            { country: 'Brazil', year: 2022, cost_healthy_diet_ppp_usd: 4.39, cost_vegetables_ppp_usd: 0.78, cost_fruits_ppp_usd: 0.65 },
            { country: 'United Kingdom', year: 2020, cost_healthy_diet_ppp_usd: 1.86, cost_vegetables_ppp_usd: 0.80, cost_fruits_ppp_usd: 0.70 },
            { country: 'United Kingdom', year: 2022, cost_healthy_diet_ppp_usd: 2.21, cost_vegetables_ppp_usd: 0.82, cost_fruits_ppp_usd: 0.68 }
        ];

        // Agrupar por país: media de cost_healthy_diet_ppp_usd, cost_vegetables, cost_fruits
        const countryMap = {};
        finalData.forEach(d => {
            const c = d.country || d.country_name_en || 'Unknown';
            if (!countryMap[c]) countryMap[c] = { total: 0, veg: 0, fruit: 0, count: 0 };
            countryMap[c].total += parseFloat(d.cost_healthy_diet_ppp_usd) || 0;
            countryMap[c].veg   += parseFloat(d.cost_vegetables_ppp_usd)   || 0;
            countryMap[c].fruit += parseFloat(d.cost_fruits_ppp_usd)        || 0;
            countryMap[c].count += 1;
        });

        const countries = Object.keys(countryMap).sort((a, b) => {
            const avgA = countryMap[a].total / countryMap[a].count;
            const avgB = countryMap[b].total / countryMap[b].count;
            return avgB - avgA;
        });

        const avgTotal  = countries.map(c => parseFloat((countryMap[c].total / countryMap[c].count).toFixed(2)));
        const avgVeg    = countries.map(c => parseFloat((countryMap[c].veg   / countryMap[c].count).toFixed(2)));
        const avgFruit  = countries.map(c => parseFloat((countryMap[c].fruit / countryMap[c].count).toFixed(2)));

        Highcharts.chart('container-diet', {
            chart: {
                type: 'bar',
                backgroundColor: '#fdfdfd'
            },
            title: {
                text: 'Coste Medio de Dieta Saludable por País',
                style: { fontSize: '18px' }
            },
            subtitle: {
                text: 'Coste diario por persona (USD PPP) — API: cost-of-healthy-diet-by-countries (NVD)'
            },
            accessibility: {
                enabled: true,
                description: 'Gráfico de barras horizontales apiladas que muestra el coste medio diario de una dieta saludable por país, desglosado en frutas, verduras y resto de componentes.'
            },
            xAxis: {
                categories: countries,
                title: { text: null },
                accessibility: { description: 'Países' }
            },
            yAxis: {
                min: 0,
                title: { text: 'Coste diario (USD PPP)', align: 'high' },
                labels: { format: '${value}' },
                accessibility: { description: 'Coste en dólares PPP' }
            },
            tooltip: {
                shared: true,
                valuePrefix: '$',
                valueSuffix: ' USD/día'
            },
            plotOptions: {
                bar: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
            },
            series: [
                {
                    name: 'Frutas',
                    data: avgFruit,
                    color: '#f28f43',
                    accessibility: { description: 'Coste medio en frutas' }
                },
                {
                    name: 'Verduras',
                    data: avgVeg,
                    color: '#2ecc71',
                    accessibility: { description: 'Coste medio en verduras' }
                },
                {
                    name: 'Resto componentes',
                    data: avgTotal.map((t, i) => parseFloat((t - avgVeg[i] - avgFruit[i]).toFixed(2))),
                    color: '#2f7ed8',
                    accessibility: { description: 'Resto del coste de la dieta saludable' }
                }
            ],
            credits: { enabled: false }
        });
    });
</script>

<main>
    <h1>Analytics — Coste de Dieta Saludable (NVD)</h1>
    <p class="subtitle">
        Desglose del coste medio diario por país: frutas, verduras y resto de componentes.
    </p>

    <div id="container-diet" aria-label="Gráfico de barras del coste de dieta saludable por país"></div>

    <div class="navigation">
        <a href="/analytics"><button class="btn-back">← Volver a Analytics</button></a>
        <a href="/cost-of-healthy-diet-by-countries"><button class="btn-data">Ver datos</button></a>
    </div>
</main>

<style>
    main {
        padding: 20px;
        max-width: 1000px;
        margin: 0 auto;
        font-family: sans-serif;
    }

    h1 {
        font-size: 1.6rem;
        margin-bottom: 6px;
    }

    .subtitle {
        color: #555;
        margin-bottom: 20px;
    }

    #container-diet {
        width: 100%;
        height: 520px;
        margin: 0 auto;
        border: 1px solid #eee;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    }

    .navigation {
        margin-top: 24px;
        display: flex;
        gap: 12px;
        justify-content: center;
    }

    button {
        padding: 10px 28px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 15px;
    }

    .btn-back {
        background-color: #333;
        color: white;
    }

    .btn-back:hover { background-color: #555; }

    .btn-data {
        background-color: #2f7ed8;
        color: white;
    }

    .btn-data:hover { background-color: #1a5faa; }
</style>