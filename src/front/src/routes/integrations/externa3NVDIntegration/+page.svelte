<script>
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    import ApexCharts from "apexcharts";

    const API_NVD = "https://sos2526-18.onrender.com/api/v1/cost-of-healthy-diet-by-countries";
    const API_CRYPTO = "https://sos2526-18.onrender.com/api/v2/proxy-crypto";

    let loading = true;
    let errorMsg = "";

    async function loadData() {
        try {
            const [resNvd, resCrypto] = await Promise.all([
                fetch(API_NVD),
                fetch(API_CRYPTO)
            ]);

            if (!resNvd.ok) throw new Error("Error al cargar datos NVD");
            if (!resCrypto.ok) throw new Error("Error al cargar datos Crypto");

            const dietData = await resNvd.json();
            const cryptoData = await resCrypto.json();

            const spainRecords = dietData.filter(
                d => d.country === "Spain" && d.cost_healthy_diet_ppp_usd != null
            );

            if (spainRecords.length === 0) throw new Error("No hay datos de Spain");

            const avgDaily =
                spainRecords.reduce((sum, d) => sum + parseFloat(d.cost_healthy_diet_ppp_usd), 0) /
                spainRecords.length;

            const annualCostUSD = avgDaily * 365;

            const names = {
                BTCUSDT: "Bitcoin",
                ETHUSDT: "Ethereum",
                SOLUSDT: "Solana",
                BNBUSDT: "BNB",
                XRPUSDT: "XRP"
            };

            const cryptoList = cryptoData
                .filter(c => names[c.symbol])
                .map(c => {
                    const price = parseFloat(c.price);
                    return {
                        name: names[c.symbol],
                        amountNeeded: annualCostUSD / price
                    };
                });

            const labels = cryptoList.map(c => c.name);
            const series = cryptoList.map(c => parseFloat(c.amountNeeded.toFixed(6)));

            loading = false;

            const chartEl = document.querySelector("#chart-donut");
            if (!chartEl) throw new Error("No se encontró el contenedor del gráfico");

            const options = {
                chart: {
                    type: "donut",
                    height: 420
                },
                labels,
                series,
                title: {
                    text: "Crypto necesaria para cubrir dieta anual en España"
                },
                subtitle: {
                    text: `Coste anual aprox: $${annualCostUSD.toFixed(2)} USD`
                },
                legend: {
                    position: "bottom"
                },
                tooltip: {
                    y: {
                        formatter: val => val.toFixed(6)
                    }
                }
            };

            const chart = new ApexCharts(chartEl, options);
            chart.render();

        } catch (e) {
            console.error(e);
            errorMsg = e.message;
            loading = false;
        }
    }

    onMount(() => {
        if (browser) loadData();
    });
</script>

<main class="container">
    <h2>Integración Externa 3 — Dieta Saludable España en Criptomonedas</h2>

    <div class="box">
        {#if loading}
            <p>Cargando...</p>
        {:else if errorMsg}
            <p class="error">{errorMsg}</p>
        {:else}
            <div id="chart-donut"></div>
        {/if}
    </div>

    <div style="text-align:center; margin-top:20px;">
        <a href="/integrations" class="btn-back">← Volver a Integraciones</a>
    </div>
</main>

<style>
    .container {
        padding: 30px;
        max-width: 900px;
        margin: 0 auto;
        font-family: system-ui;
    }
    .box {
        background: white;
        padding: 20px;
        border-radius: 12px;
        border: 1px solid #ddd;
        min-height: 450px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .error {
        color: white;
        background: #c53030;
        padding: 12px 18px;
        border-radius: 8px;
    }
    .btn-back {
        display: inline-block;
        padding: 10px 20px;
        background: #2d3748;
        color: white;
        text-decoration: none;
        border-radius: 6px;
    }
</style>