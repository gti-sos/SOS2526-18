<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    const API_NVD = 'https://sos2526-18.onrender.com/api/v1/cost-of-healthy-diet-by-countries';
    // Frankfurter: tipos de cambio históricos gratuitos, sin API key
    // Usamos el tipo de cambio USD → moneda local de cada país de mi API
    const API_FF = 'https://api.frankfurter.dev/v1/latest?from=USD'; 

    // Moneda local de cada país en mi API
    const COUNTRY_CURRENCY = {
        'Spain':           'EUR',
        'United Kingdom':  'GBP',
        'China, mainland': 'CNY',
        'Brazil':          'BRL'
    };

    let loading = true;
    let errorMsg = '';

    async function loadData() {
        if (!browser) return;
        try {
            const [resNvd, resFx] = await Promise.all([
                fetch(API_NVD),
                fetch(API_FF)
            ]);

            if (!resNvd.ok) throw new Error('Error al acceder a la API de dietas');
            if (!resFx.ok)  throw new Error('Error al acceder a Frankfurter');

            const dietData = await resNvd.json();
            const fxData   = await resFx.json(); // { rates: { EUR: x, GBP: y, ... } }

            if (!dietData || dietData.length === 0) {
                errorMsg = 'La API de dietas no tiene datos.';
                loading = false;
                return;
            }

            // Coste medio por país en mi API
            const costMap = {};
            dietData.forEach(d => {
                if (!COUNTRY_CURRENCY[d.country]) return;
                if (!costMap[d.country]) costMap[d.country] = { total: 0, count: 0 };
                if (d.cost_healthy_diet_ppp_usd != null) {
                    costMap[d.country].total += parseFloat(d.cost_healthy_diet_ppp_usd);
                    costMap[d.country].count++;
                }
            });

            // Combinar: coste medio en USD y coste equivalente en moneda local
            const combined = [];
            Object.entries(costMap).forEach(([country, info]) => {
                if (info.count === 0) return;
                const avgCostUSD  = info.total / info.count;
                const currency    = COUNTRY_CURRENCY[country];
                const rate        = fxData.rates[currency] || 1;
                const costLocal   = avgCostUSD * rate;
                combined.push({
                    name:        country,
                    avgCostUSD:  parseFloat(avgCostUSD.toFixed(2)),
                    costLocal:   parseFloat(costLocal.toFixed(2)),
                    currency,
                    rate:        parseFloat(rate.toFixed(4))
                });
            });

            if (combined.length === 0) {
                errorMsg = 'No hay datos combinados para mostrar.';
                loading = false;
                return;
            }

            combined.sort((a, b) => b.avgCostUSD - a.avgCostUSD);

            const echarts = await import('echarts');
            loading = false;

            setTimeout(() => {
                const el = document.getElementById('chart-ext2');
                if (!el) return;
                const chart = echarts.init(el);

                chart.setOption({
                    backgroundColor: '#fff',
                    title: {
                        text: 'Coste Dieta: USD vs Moneda Local',
                        subtext: `NVD API (dietas) + Frankfurter (tipos de cambio al ${fxData.date})`,
                        left: 'center',
                        textStyle:    { fontSize: 16, color: '#2d3748' },
                        subtextStyle: { fontSize: 11, color: '#718096' }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { type: 'shadow' },
                        formatter: params => {
                            const d = combined[params[0].dataIndex];
                            return `<b>${d.name}</b><br/>
                                    USD PPP/día: <b>${d.avgCostUSD}</b><br/>
                                    ${d.currency}/día: <b>${d.costLocal}</b><br/>
                                    Tipo de cambio: <b>1 USD = ${d.rate} ${d.currency}</b>`;
                        }
                    },
                    legend: {
                        data: ['Coste en USD PPP/día', 'Coste en moneda local/día'],
                        bottom: 5
                    },
                    grid: { left: '3%', right: '6%', top: '18%', bottom: '14%', containLabel: true },
                    xAxis: { type: 'value' },
                    yAxis: {
                        type: 'category',
                        data: combined.map(d => `${d.name} (${d.currency})`),
                        axisLabel: { fontSize: 11 }
                    },
                    series: [
                        {
                            name: 'Coste en USD PPP/día',
                            type: 'bar',
                            data: combined.map(d => d.avgCostUSD),
                            itemStyle: { color: '#4a90d9', borderRadius: [0, 4, 4, 0] },
                            label: { show: true, position: 'right', formatter: '{c} $', fontSize: 11 }
                        },
                        {
                            name: 'Coste en moneda local/día',
                            type: 'bar',
                            data: combined.map(d => d.costLocal),
                            itemStyle: { color: '#e8a838', borderRadius: [0, 4, 4, 0] },
                            label: { show: true, position: 'right', fontSize: 11 }
                        }
                    ]
                });

                window.addEventListener('resize', () => chart.resize());
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
        <h2>Integración Externa 2 — Coste de Dieta × Cambio (Moneda de cada país)</h2>
        <p>
            Convierte el coste de la dieta saludable (mi API, en USD PPP/día) a la
            moneda local de cada país usando los tipos de cambio.
        </p>
    </div>

    <div id="chart-ext2" style="height:420px; background:white; border-radius:12px; border:1px solid #e2e8f0; display:flex; align-items:center; justify-content:center;">
        {#if loading}
            <p style="color:#718096;">Cargando tipos de cambio...</p>
        {:else if errorMsg}
            <p style="color:#721c24; background:#f8d7da; padding:20px; border-radius:8px; margin:20px;">{errorMsg}</p>
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