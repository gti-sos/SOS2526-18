<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';


    // MI API: /api/v1/cost-of-healthy-diet-by-countries  (NVD)
    // API G14: /api/v2/proxy-space-launches  (proxy propio → G14)
    // Biblioteca: Highcharts  |  Tipo: variwide
    //   · Eje Y (altura) = coste medio diario dieta saludable (USD PPP)
    //   · Anchura = nº de lanzamientos espaciales del país


    onMount(async () => {
        if (!browser) return;

        // ── 1. CARGA DE HIGHCHARTS + MÓDULO VARIWIDE ─────────────────────────
        const HC         = await import('highcharts');
        const HCVariwide  = await import('highcharts/modules/variwide');
        const Highcharts  = HC.default || HC;
        const initVariwide = HCVariwide.default || HCVariwide;
        if (typeof initVariwide === 'function') initVariwide(Highcharts);

        // ── 2. FETCH EN PARALELO ──────────────────────────────────────────────
        let dietData   = [];
        let launchData = [];

        const [resDiet, resLaunch] = await Promise.allSettled([
            fetch('/api/v1/cost-of-healthy-diet-by-countries'),
            fetch('/api/v2/proxy-space-launches')
        ]);

        if (resDiet.status === 'fulfilled' && resDiet.value.ok)
            dietData = await resDiet.value.json();

        if (resLaunch.status === 'fulfilled' && resLaunch.value.ok)
            launchData = await resLaunch.value.json();

        // ── 3. VALIDAR CAMPOS ÚTILES ──────────────────────────────────────────
        //    Solo se usan registros que tengan los campos necesarios.
        //    Si alguna API devuelve vacío, el gráfico queda vacío.

        const validDiet = dietData.filter(d =>
            d.country &&
            d.cost_healthy_diet_ppp_usd !== undefined &&
            d.cost_healthy_diet_ppp_usd !== null &&
            !isNaN(parseFloat(d.cost_healthy_diet_ppp_usd))
        );

        const validLaunch = launchData.filter(r =>
            r.country || r.launch_country || r.agency_country
        );

        // ── 4. MEDIA DE COSTE POR PAÍS (mi API) ──────────────────────────────
        const dietByCountry = {};
        validDiet.forEach(d => {
            const c = d.country;
            if (!dietByCountry[c]) dietByCountry[c] = { sum: 0, count: 0 };
            dietByCountry[c].sum   += parseFloat(d.cost_healthy_diet_ppp_usd);
            dietByCountry[c].count += 1;
        });

        // ── 5. CONTAR LANZAMIENTOS POR PAÍS (API G14) ─────────────────────────
        //    Soporta dos formatos posibles:
        //      a) registros individuales: { country, year, status, ... }
        //      b) ya agregados:           { country, launches }
        const launchByCountry = {};
        if (validLaunch.length && validLaunch[0].launches !== undefined) {
            // formato b) ya agregado
            validLaunch.forEach(r => {
                launchByCountry[r.country] = r.launches;
            });
        } else {
            // formato a) individual
            validLaunch.forEach(r => {
                const c = r.country || r.launch_country || r.agency_country;
                if (c) launchByCountry[c] = (launchByCountry[c] || 0) + 1;
            });
        }

        // ── 6. CRUZAR: solo países presentes en AMBAS APIs ───────────────────
        const norm = s => s.toLowerCase().replace(/[,\.]/g, '').trim();

        const crossed = Object.keys(dietByCountry).map(dc => {
            const matchKey = Object.keys(launchByCountry).find(lc =>
                norm(lc).includes(norm(dc)) || norm(dc).includes(norm(lc))
            );
            if (!matchKey) return null;
            const avgCost  = dietByCountry[dc].sum / dietByCountry[dc].count;
            const launches = launchByCountry[matchKey];
            return { country: dc, avgCost: parseFloat(avgCost.toFixed(2)), launches };
        }).filter(Boolean);

        // Ordenar por coste descendente
        crossed.sort((a, b) => b.avgCost - a.avgCost);

        // ── 7. SUBTÍTULO SEGÚN ESTADO DE LOS DATOS ───────────────────────────
        let subtitle = '';
        if (validDiet.length === 0 && validLaunch.length === 0) {
            subtitle = 'Ambas APIs están vacías — carga los datos iniciales primero';
        } else if (validDiet.length === 0) {
            subtitle = 'API de dieta vacía — carga: /api/v1/cost-of-healthy-diet-by-countries/loadInitialData';
        } else if (validLaunch.length === 0) {
            subtitle = 'API de lanzamientos (G14) vacía o no disponible';
        } else if (crossed.length === 0) {
            subtitle = 'No se encontraron países en común entre las dos APIs';
        } else {
            subtitle = 'Altura = coste medio USD PPP/día · Anchura proporcional = nº de lanzamientos espaciales';
        }

        // ── 8. COLOR POR COSTE ────────────────────────────────────────────────
        const color = cost => {
            if (cost > 4)   return '#b71c1c';
            if (cost > 3)   return '#e65100';
            if (cost > 2)   return '#2e7d32';
            return '#1565c0';
        };

        // ── 9. RENDERIZAR ─────────────────────────────────────────────────────
        Highcharts.chart('container-variwide', {
            chart: {
                type: 'variwide',
                backgroundColor: '#fdfdfd'
            },
            title: {
                text: 'Integración: Coste de Dieta Saludable vs Lanzamientos Espaciales',
                style: { fontSize: '16px' }
            },
            subtitle: { text: subtitle },
            accessibility: {
                enabled: true,
                description: 'Gráfico variwide que integra datos de coste de dieta saludable (NVD) ' +
                             'con datos de lanzamientos espaciales (G14). La altura de cada barra ' +
                             'representa el coste diario en USD PPP y la anchura es proporcional ' +
                             'al número de lanzamientos espaciales del país.'
            },
            xAxis: {
                type: 'category',
                labels: { style: { fontSize: '12px' }, rotation: -35 },
                accessibility: { description: 'Países con datos en ambas APIs' }
            },
            yAxis: {
                title: { text: 'Coste medio dieta saludable (USD PPP/día)' },
                labels: { format: '${value:.2f}' },
                min: 0,
                accessibility: { description: 'Coste en dólares PPP por día' }
            },
            tooltip: {
                headerFormat: '',
                pointFormatter: function () {
                    return `<b>${this.name}</b><br/>
                            Coste dieta: <b>$${this.y.toFixed(2)} USD PPP/día</b><br/>
                            Lanzamientos espaciales: <b>${this.z}</b><br/>
                            <span style="font-size:11px;color:#888">Anchura proporcional a nº de lanzamientos</span>`;
                }
            },
            legend: { enabled: false },
            series: [{
                name: 'Países',
                data: crossed.map(d => ({
                    name: d.country,
                    y: d.avgCost,
                    z: d.launches,
                    color: color(d.avgCost)
                })),
                dataLabels: {
                    enabled: crossed.length > 0,
                    formatter: function () { return '$' + this.y.toFixed(2); },
                    style: { color: '#fff', fontSize: '11px', fontWeight: '500', textOutline: 'none' }
                },
                borderWidth: 0,
                borderRadius: 3
            }],
            credits: { enabled: false }
        });
    });
</script>

<main class="container">
    <header>
        <h1>Integración G18 (Dieta) + G14 (Lanzamientos Espaciales)</h1>
        <p class="subtitle">
            Relaciona el <strong>coste de una dieta saludable</strong> (mi API) con el
            <strong>número de lanzamientos espaciales</strong> por país (API de G14, accedida
            mediante proxy propio <code>/api/v2/proxy-space-launches</code>).
            Solo se representan países presentes en ambas APIs.
        </p>
    </header>

    <div class="legend">
        <span class="dot" style="background:#b71c1c"></span> Coste &gt; $4/día
        <span class="dot" style="background:#e65100; margin-left:12px"></span> Coste $3–4/día
        <span class="dot" style="background:#2e7d32; margin-left:12px"></span> Coste $2–3/día
        <span class="dot" style="background:#1565c0; margin-left:12px"></span> Coste &lt; $2/día
    </div>

    <div
        id="container-variwide"
        aria-label="Gráfico variwide de coste de dieta saludable vs lanzamientos espaciales por país"
    ></div>

    <div class="info-box">
        <p>
            <strong>Fuente 1:</strong> Mi API —
            <code>/api/v1/cost-of-healthy-diet-by-countries</code><br />
            <strong>Fuente 2:</strong> API Grupo 14 (space-launches) accedida a través del
            proxy propio <code>/api/v2/proxy-space-launches</code>.
        </p>
        <p>
            Si alguna de las dos APIs está vacía, el gráfico aparecerá vacío y el subtítulo
            indicará cuál de ellas no tiene datos.
        </p>
    </div>

    <div style="text-align:center; margin-top:20px;">
        <a href="/integrations" class="btn-back">← Volver al Índice</a>
    </div>
</main>

<style>
    .container {
        padding: 30px 20px;
        max-width: 1100px;
        margin: 0 auto;
        font-family: 'Segoe UI', system-ui, sans-serif;
    }

    h1 { font-size: 1.5rem; margin-bottom: 8px; }

    .subtitle {
        color: #555;
        font-size: 0.95rem;
        margin-bottom: 16px;
    }

    .legend {
        font-size: 13px;
        color: #444;
        margin-bottom: 14px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 4px;
    }

    .dot {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 2px;
        margin-right: 4px;
    }

    #container-variwide {
        width: 100%;
        height: 500px;
        border: 1px solid #eee;
        border-radius: 10px;
        background: #fdfdfd;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    }

    .info-box {
        margin-top: 20px;
        padding: 16px;
        background: #f8f9fa;
        border-left: 5px solid #2c3e50;
        font-size: 0.88rem;
        color: #444;
        border-radius: 4px;
    }

    .info-box p { margin: 6px 0; }

    .btn-back {
        display: inline-block;
        padding: 10px 24px;
        background: #2c3e50;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
    }

    .btn-back:hover { background: #3d5166; }

    code {
        background: #eee;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 0.85em;
    }
</style>