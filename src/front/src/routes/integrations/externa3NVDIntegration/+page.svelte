<script>
    import { onMount,tick } from 'svelte';
    import { browser } from '$app/environment';

    const API_NVD    = 'https://sos2526-18.onrender.com/api/v1/cost-of-healthy-diet-by-countries';
    const API_CRYPTO = 'https://sos2526-18.onrender.com/api/v2/proxy-crypto';

    let loading  = true;
    let errorMsg = '';

    async function loadData() {
        if (!browser) return;
        try {
            const [resNvd, resCrypto] = await Promise.all([
                fetch(API_NVD),
                fetch(API_CRYPTO)
            ]);

            if (!resNvd.ok || !resCrypto.ok) throw new Error('Error al cargar datos');

            const dietData   = await resNvd.json();
            const cryptoData = await resCrypto.json();

            let totalCost = 0, count = 0;
            dietData.forEach(d => {
                if (d.cost_healthy_diet_ppp_usd != null) {
                    totalCost += parseFloat(d.cost_healthy_diet_ppp_usd);
                    count++;
                }
            });

            const avgDailyCost  = totalCost / count;
            const annualCostUSD = parseFloat((avgDailyCost * 365).toFixed(2));

            const names = {
                BTCUSDT: { name: 'Bitcoin',  symbol: 'BTC' },
                ETHUSDT: { name: 'Ethereum', symbol: 'ETH' },
                SOLUSDT: { name: 'Solana',   symbol: 'SOL' },
                BNBUSDT: { name: 'BNB',      symbol: 'BNB' },
                XRPUSDT: { name: 'XRP',      symbol: 'XRP' },
            };
            const cryptoList = cryptoData.map(c => ({
                name:         names[c.symbol].name,
                symbol:       names[c.symbol].symbol,
                priceUsd:     parseFloat(parseFloat(c.price).toFixed(2)),
                amountNeeded: parseFloat((annualCostUSD / parseFloat(c.price)).toFixed(6))
            }));

            const { Chart, registerables } = await import('chart.js');
            Chart.register(...registerables);

            loading = false;
            await tick();
            const el = document.getElementById('chart-ext3');
            if (!el) return;

            const ctx = el.getContext('2d');

            const colors = [
                'rgba(247, 147, 26, 0.7)',
                'rgba(98, 126, 234, 0.7)',
                'rgba(153, 69, 255, 0.7)',
                'rgba(243, 186, 47, 0.7)',
                'rgba(0, 168, 232, 0.7)',
            ];

            const borderColors = [
                'rgba(247, 147, 26, 1)',
                'rgba(98, 126, 234, 1)',
                'rgba(153, 69, 255, 1)',
                'rgba(243, 186, 47, 1)',
                'rgba(0, 168, 232, 1)',
            ];

            new Chart(ctx, {
                type: 'polarArea',
                data: {
                    labels: cryptoList.map(c => `${c.name} (${c.symbol})`),
                    datasets: [{
                        label: 'Cantidad de crypto necesaria',
                        data: cryptoList.map(c => c.amountNeeded),
                        backgroundColor: colors,
                        borderColor: borderColors,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Crypto necesaria para costear la dieta saludable anual media global',
                            font: { size: 15 },
                            color: '#2d3748',
                            padding: { bottom: 6 }
                        },
                        subtitle: {
                            display: true,
                            text: `Coste medio diario global: $${avgDailyCost.toFixed(2)} USD | Coste anual: $${annualCostUSD} USD | Fuente: NVD API + Binance`,
                            font: { size: 11 },
                            color: '#718096',
                            padding: { bottom: 16 }
                        },
                        legend: { position: 'bottom' },
                        tooltip: {
                            callbacks: {
                                label: ctx => {
                                    const c = cryptoList[ctx.dataIndex];
                                    return [
                                        `Precio actual: $${c.priceUsd.toLocaleString()} USD`,
                                        `Cantidad necesaria: ${c.amountNeeded} ${c.symbol}`,
                                        `Coste anual dieta: $${annualCostUSD} USD`
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
        }

        } catch (e) {
            errorMsg = 'Error: ' + e.message;
            loading = false;
        }

    onMount(loadData);
</script>

<main class="container">
    <div class="header-info">
        <h2>Integración Externa 3 — Dieta Saludable en Criptomonedas</h2>
        <p>
            Calcula el coste medio anual de una dieta saludable a nivel global
            usando todos los registros de mi API, y lo convierte a las 5
            principales criptomonedas usando precios en tiempo real de
            Binance a través de un proxy propio.
            Calcula cuánto Bitcoin, Ethereum, Solana, BNB o XRP necesitas para
            comer sano un año entero
        </p>
    </div>

    <div style="height:520px; background:white; border-radius:12px; border:1px solid #e2e8f0; padding:20px;">
        {#if loading}
            <div style="display:flex; align-items:center; justify-content:center; height:100%;">
                <p style="color:#718096;">Cargando...</p>
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