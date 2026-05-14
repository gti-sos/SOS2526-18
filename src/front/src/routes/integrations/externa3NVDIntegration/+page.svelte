<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    const API_NVD    = 'https://sos2526-18.onrender.com/api/v1/cost-of-healthy-diet-by-countries';
    const API_CRYPTO = 'https://sos2526-18.onrender.com/api/v2/proxy-crypto';

    let loading  = true;
    let errorMsg = '';

    const COUNTRIES = ['Spain', 'United Kingdom', 'China, mainland', 'Brazil', 'Egypt'];

    async function loadData() {
        if (!browser) return;
        try {
            const [resNvd, resCrypto] = await Promise.all([
                fetch(API_NVD),
                fetch(API_CRYPTO)
            ]);

            if (!resNvd.ok)    throw new Error('Error al acceder a la API de dietas');
            if (!resCrypto.ok) throw new Error('Error al acceder al proxy crypto');

            const dietData   = await resNvd.json();
            const cryptoData = await resCrypto.json();

            // Precios actuales
            const btcPrice = cryptoData.bitcoin.usd;
            const ethPrice = cryptoData.ethereum.usd;

            // Coste medio anual por país
            const costMap = {};
            dietData.forEach(d => {
                if (!COUNTRIES.includes(d.country)) return;
                if (!costMap[d.country]) costMap[d.country] = { total: 0, count: 0 };
                if (d.cost_healthy_diet_ppp_usd != null) {
                    costMap[d.country].total += parseFloat(d.cost_healthy_diet_ppp_usd);
                    costMap[d.country].count++;
                }
            });

            const combined = [];
            Object.entries(costMap).forEach(([country, info]) => {
                if (info.count === 0) return;
                const avgDailyCost  = info.total / info.count;
                const annualCostUSD = parseFloat((avgDailyCost * 365).toFixed(2));
                const btcNeeded     = parseFloat((annualCostUSD / btcPrice).toFixed(6));
                const ethNeeded     = parseFloat((annualCostUSD / ethPrice).toFixed(6));
                combined.push({ country, annualCostUSD, btcNeeded, ethNeeded });
            });

            combined.sort((a, b) => b.annualCostUSD - a.annualCostUSD);

            const { Chart, registerables } = await import('chart.js');
            Chart.register(...registerables);

            loading = false;

            setTimeout(() => {
                const el = document.getElementById('chart-ext3');
                if (!el) return;

                const ctx = el.getContext('2d');

                new Chart(ctx, {
                    type: 'polarArea',
                    data: {
                        labels: combined.map(d => d.country),
                        datasets: [
                            {
                                label: 'BTC necesario/año',
                                data: combined.map(d => d.btcNeeded),
                                backgroundColor: [
                                    'rgba(247, 147, 26, 0.7)',
                                    'rgba(247, 147, 26, 0.55)',
                                    'rgba(247, 147, 26, 0.4)',
                                    'rgba(247, 147, 26, 0.3)',
                                    'rgba(247, 147, 26, 0.2)',
                                ],
                                borderColor: 'rgba(247, 147, 26, 1)',
                                borderWidth: 1
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            title: {
                                display: true,
                                text: 'BTC necesario para costear la dieta anual por país',
                                font: { size: 16 },
                                color: '#2d3748'
                            },
                            subtitle: {
                                display: true,
                                text: `Precio BTC: $${btcPrice.toLocaleString()} | Precio ETH: $${ethPrice.toLocaleString()} | NVD API + CoinGecko`,
                                font: { size: 11 },
                                color: '#718096',
                                padding: { bottom: 10 }
                            },
                            legend: { position: 'bottom' },
                            tooltip: {
                                callbacks: {
                                    label: ctx => {
                                        const d = combined[ctx.dataIndex];
                                        return [
                                            `Coste anual: $${d.annualCostUSD} USD`,
                                            `BTC necesario: ${d.btcNeeded} BTC`,
                                            `ETH necesario: ${d.ethNeeded} ETH`
                                        ];
                                    }
                                }
                            }
                        },
                        scales: {
                            r: {
                                ticks: {
                                    backdropColor: 'transparent',
                                    font: { size: 10 }
                                }
                            }
                        }
                    }
                });
            }, 100);

        } catch (e) {
            errorMsg = 'Error: ' + e.message;
            loading = false;
        }
    }

    onMount(loadData);
</script>

<main class="container">
    <div class="header-info">
        <h2>Integración Externa 3 — Coste de Dieta en Criptomonedas</h2>
        <p>
            Cruza el coste medio anual de una dieta saludable por país (mi API) con
            el precio actual de Bitcoin y Ethereum
            obtenido a través de un proxy propio que consulta CoinGecko.
            El resultado muestra cuánto BTC necesitarías para alimentarte
            durante un año entero en cada país.
        </p>
    </div>

    <div style="height:500px; background:white; border-radius:12px; border:1px solid #e2e8f0; padding: 20px;">
        {#if loading}
            <div style="display:flex; align-items:center; justify-content:center; height:100%;">
                <p style="color:#718096;"> Cargando...</p>
            </div>
        {:else if errorMsg}
            <div style="display:flex; align-items:center; justify-content:center; height:100%;">
                <p style="color:#721c24; background:#f8d7da; padding:20px; border-radius:8px;">{errorMsg}</p>
            </div>
        {:else}
            <canvas id="chart-ext3"></canvas>
        {/if}
    </div>

    <div style="text-align:center; margin-top:20px;">
        <a href="/integrations" class="btn-back">← Volver a Integraciones</a>
    </div>
</main>

<style>
    .container {
        padding: 30px 20px;
        max-width: 960px;
        margin: 0 auto;
        font-family: 'Segoe UI', system-ui, sans-serif;
        color: #2d3748;
    }
    .header-info { margin-bottom: 24px; }
    .header-info h2 { font-size: 1.5rem; color: #1a202c; margin-bottom: 6px; }
    .header-info p { color: #718096; font-size: 0.95rem; }
    .btn-back {
        display: inline-block;
        padding: 10px 22px;
        background: #2d3748;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        margin-top: 10px;
    }
    .btn-back:hover { background: #4a5568; }
</style>