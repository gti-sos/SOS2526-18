<script>
    import { onMount } from "svelte";
    import Highcharts from "highcharts";
 
    let loading = true;
    let error = null;
 
    const G14_URL = "https://sos2526-14-yjus.onrender.com/api/v2/space-launches?limit=200&offset=0";
 
    onMount(async () => {
        try {
            const [dietRes, launchRes] = await Promise.all([
                fetch("/api/v1/cost-of-healthy-diet-by-countries"),
                fetch(G14_URL)
            ]);
 
            if (!dietRes.ok)   throw new Error("Error cargando API cost-of-healthy-diet-by-countries");
            if (!launchRes.ok) throw new Error("Error cargando API space-launches (G14)");
 
            const dietData   = await dietRes.json();
            const launchData = await launchRes.json();
 
            const validDiet = dietData.filter(d =>
                d.country &&
                d.cost_healthy_diet_ppp_usd !== undefined &&
                d.cost_healthy_diet_ppp_usd !== null &&
                !isNaN(parseFloat(d.cost_healthy_diet_ppp_usd))
            );
 
            if (validDiet.length === 0)
                throw new Error("Tu API no tiene datos válidos. Ejecuta loadInitialData primero.");
 
            if (launchData.length === 0)
                throw new Error("La API de lanzamientos (G14) no tiene datos válidos.");
 
            // Cuenta launches por país
            const launchByCountry = {};
            launchData.forEach(r => {
                const country = r.country || r.launch_country || r.agency_country;
                if (country && country !== "Unknown") {
                    launchByCountry[country] = (launchByCountry[country] || 0) + 1;
                }
            });
 
            const dietByCountry = {};
            validDiet.forEach(d => {
                const c = d.country;
                if (!dietByCountry[c]) dietByCountry[c] = { sum: 0, count: 0 };
                dietByCountry[c].sum   += parseFloat(d.cost_healthy_diet_ppp_usd);
                dietByCountry[c].count += 1;
            });
 
            //Cruzar solo paises que estén en ambas APIs
            const norm = s => s.toLowerCase().replace(/[,.]/g, "").trim();
 
            const points = Object.keys(dietByCountry).map(dc => {
                const matchKey = Object.keys(launchByCountry).find(lc =>
                    norm(lc).includes(norm(dc)) || norm(dc).includes(norm(lc))
                );
                if (!matchKey) return null;
                const avgCost  = dietByCountry[dc].sum / dietByCountry[dc].count;
                const launches = launchByCountry[matchKey];
                return { name: dc, y: parseFloat(avgCost.toFixed(2)), z: launches };
            }).filter(p => p !== null && p.z > 0);
 
            if (points.length === 0)
                throw new Error("No hay países en común entre las dos APIs.");
 
            points.sort((a, b) => b.y - a.y);
 
            Highcharts.chart("container-variwide", {
                chart: { type: "variwide" },
                title: { text: "Integración G14 + NVD " },
                subtitle: {
                    text: "Altura = coste dieta saludable (USD PPP/día) · Anchura = nº lanzamientos espaciales (muestra de 200)"
                },
                accessibility: {
                    enabled: true,
                    description: "Gráfico variwide que cruza el coste de la dieta saludable (NVD) " +
                                 "con el número de lanzamientos espaciales por país (G14, muestra de 200 registros). " +
                                 "La altura de cada barra es el coste diario en USD PPP y " +
                                 "la anchura es proporcional al número de lanzamientos."
                },
                xAxis: {
                    type: "category",
                    title: { text: "País" },
                    labels: { rotation: -35, style: { fontSize: "11px" } }
                },
                yAxis: {
                    min: 0,
                    title: { text: "Coste dieta saludable (USD PPP / día)" },
                    labels: { format: "${value:.2f}" }
                },
                tooltip: {
                    headerFormat: "",
                    pointFormat: "<b>{point.name}</b><br/>" +
                                 "Coste dieta: <b>${point.y:.2f} USD PPP/día</b><br/>" +
                                 "Lanzamientos espaciales: <b>{point.z}</b>"
                },
                legend: { enabled: false },
                series: [{
                    name: "País",
                    data: points.map(p => [p.name, p.y, p.z]),
                    dataLabels: {
                        enabled: true,
                        formatter: function () { return "$" + this.y.toFixed(2); },
                        style: { fontSize: "10px", color: "#fff", textOutline: "none" }
                    },
                    borderWidth: 0,
                    borderRadius: 3
                }],
                credits: { enabled: false }
            });
 
            loading = false;
 
        } catch (e) {
            error = e.message;
            loading = false;
        }
    });
</script>

<main>
    <h1>G14NVDIntegration</h1>
    <p class="subtitle">
        Gráfico Variwide: altura según el coste de dieta saludable, anchura según el número de lanzamientos espaciales.
    </p>

    {#if loading}
        <p class="loading">Cargando datos desde ambas APIs...</p>
    {:else if error}
        <p class="error">❌ {error}</p>
        <p class="hint">
            Asegúrate de haber ejecutado <b>loadInitialData</b> en ambas APIs.
        </p>
    {:else}
        <div id="container-variwide"></div>
    {/if}

    <div class="navigation">
        <a href="/integrations"><button class="btn-back">← Volver a Integrations</button></a>
    </div>
</main>

<style>
    main {
        padding: 20px;
        max-width: 1100px;
        margin: 0 auto;
        font-family: sans-serif;
    }

    h1 {
        font-size: 1.7rem;
        margin-bottom: 6px;
    }

    .subtitle {
        color: #555;
        margin-bottom: 18px;
    }

    .loading {
        font-size: 1.1rem;
        color: #333;
        margin-top: 30px;
        text-align: center;
    }

    .error {
        color: red;
        font-weight: bold;
        margin-top: 25px;
        text-align: center;
    }

    .hint {
        margin-top: 10px;
        text-align: center;
        color: #444;
    }

    #container-variwide {
        width: 100%;
        height: 650px;
        margin-top: 20px;
        border: 1px solid #eee;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    }

    .navigation {
        margin-top: 24px;
        display: flex;
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

    .btn-back:hover {
        background-color: #555;
    }
</style>