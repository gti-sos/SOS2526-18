<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let loading = true;
    let urlProxyCountries = "/api/v2/proxy-countries3";

    function loadPlotlyScript() {
        return new Promise((resolve) => {
            if (window.Plotly) return resolve(window.Plotly);

            const script = document.createElement('script');
            script.src = "https://cdn.plot.ly/plotly-latest.min.js";
            script.onload = () => resolve(window.Plotly);
            document.head.appendChild(script);
        });
    }

    async function loadData() {
        if (!browser) return;

        try {
            const Plotly = await loadPlotlyScript();

            const res = await fetch(urlProxyCountries);
            const countries = await res.json();

            const filtered = countries.filter(c => 
                c.gdp && c.gdpPerCapita && c.population
            );

            const trace = {
                x: filtered.map(c => c.gdpPerCapita),
                y: filtered.map(c => c.gdp),
                text: filtered.map(c => `${c.name} (${c.region})`),
                mode: 'markers',
                type: 'scatter',
                marker: {
                    size: filtered.map(c => parseInt(c.population) / 50000000),
                    color: filtered.map(c => c.gdp),
                    colorscale: 'Viridis',
                    showscale: true
                }
            };

            const layout = {
                title: 'GDP vs GDP per Capita (Plotly CDN)',
                xaxis: { title: 'GDP per Capita' },
                yaxis: { title: 'GDP' }
            };

            loading = false;

            setTimeout(() => {
                Plotly.newPlot('plotlyChart', [trace], layout);
            }, 100);

        } catch (e) {
            console.error("Error:", e);
        }
    }

    onMount(loadData);
</script>

<main>
    <div class="chart-container">
        {#if loading}
            <div class="msg">Cargando gráfico...</div>
        {/if}
        <div id="plotlyChart"></div>
    </div>

    <div class="button-container">
        <a href="/integrations" class="btn-back">← Volver</a>
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

    #plotlyChart {
        width: 100%;
        height: 100%;
    }

    .msg {
        text-align: center;
        margin-top: 100px;
    }
</style>