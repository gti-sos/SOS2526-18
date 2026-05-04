<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    let Highcharts;

    async function loadGraph() {
        try {
            // Llamadas a las APIs
            const resMe = await fetch("https://sos2526-18.onrender.com/api/v2/cereal-productions");
            const resHer = await fetch("https://sos2526-13.onrender.com/api/v2/exportations-stats");

            const myData = await resMe.json(); 
            const herData = await resHer.json();

            // 1. Buscamos países donde ella sea proveedora (supplier) y tú tengas datos
            const commonCountries = myData
                .map(d => d.country)
                .filter(country => herData.some(h => h.supplier === country));
            
            const uniqueCountries = [...new Set(commonCountries)];

            // 2. Preparamos los datos reales (Producción vs Exportación)
            const seriesData = uniqueCountries.map(country => {
                // Tus datos (Media de producción / 100.000)
                const myEntries = myData.filter(d => d.country === country);
                const m = (myEntries.reduce((acc, curr) => acc + curr.cereal_production, 0) / myEntries.length) / 100000;
                 
                // Sus datos (Solo donde el país es SUPPLIER) 
                const herEntries = herData.filter(h => h.supplier === country);
                const h = herEntries.reduce((acc, curr) => acc + (curr.tiv_total_order || 0), 0) / herEntries.length;
                
                const low = Math.min(m, h);
                const high = Math.max(m, h);
                const median = (m + h) / 2; // Media aritmética para la raya central

                return { low, median, high };
            });

            // 3. Renderizado del gráfico
            Highcharts.chart('container-g13', {
                chart: { type: 'lowmedhigh' },
                title: { text: 'Integración Final G18 + G13 (Solo Proveedores)' },
                subtitle: { text: 'Comparativa real con Media dibujada' },
                xAxis: { 
                    categories: uniqueCountries,
                    title: { text: 'Países comunes (España / Afganistán)' }
                },
                yAxis: { title: { text: 'Valor Escala Ajustada' } },
                series: [{
                    name: 'Rango y Media Real',
                    data: seriesData.map(d => [d.low, d.median, d.high]),
                    color: '#28a745'
                }],
                tooltip: {
                    formatter: function () {
                        return `<b>${uniqueCountries[this.x]}</b><br/>` +
                               `Mín: ${this.point.low.toFixed(2)}<br/>` +
                               `<b>Media: ${this.point.median.toFixed(2)}</b><br/>` +
                               `Máx: ${this.point.high.toFixed(2)}`;
                    }
                },
                credits: { enabled: false }
            });

        } catch (error) {
            console.error("Error al cargar los datos en el gráfico:", error);
        }
    }

    onMount(async () => {
        if (browser) {
            try {
                // CARGA SEGURA DE MÓDULOS
                const HC = await import('highcharts');
                Highcharts = HC.default || HC;

                const HC_more_module = await import('highcharts/highcharts-more');
                const initMore = HC_more_module.default || HC_more_module;
                
                // Verificamos que sea una función antes de ejecutar para evitar el TypeError
                if (typeof initMore === 'function') {
                    initMore(Highcharts);
                } else {
                    console.error("No se pudo cargar Highcharts-More como función");
                }

                // DEFINICIÓN DEL TIPO DE GRÁFICO (Dibuja las 3 rayas)
                Highcharts.seriesType('lowmedhigh', 'boxplot', {
                    keys: ['low', 'median', 'high']
                }, {
                    drawPoints: function () {
                        const series = this;
                        this.points.forEach(function (p) {
                            if (!p.graphic) p.graphic = series.chart.renderer.path('point').add(series.group);
                            const s = p.shapeArgs;
                            const x = Math.floor(s.x) + 0.5, w = s.width, r = x + w, cx = x + Math.round(w / 2);
                            
                            p.graphic.attr({ stroke: p.color || series.color, 'stroke-width': 2 }).animate({
                                d: [
                                    'M', x, p.highPlot, 'H', r,    // Raya Superior
                                    'M', x, p.medianPlot, 'H', r,  // RAYA DE LA MEDIA
                                    'M', x, p.lowPlot, 'H', r,     // Raya Inferior
                                    'M', cx, p.highPlot, 'V', p.lowPlot // Línea de unión
                                ]
                            });
                        });
                    }
                });

                loadGraph();
            } catch (e) {
                console.error("Error crítico inicializando Highcharts:", e);
            }
        }
    });
</script>

<main>
    <h2>Integración G18 (Cereales) + G13 (Exportaciones)</h2>
    
    <div id="container-g13" style="width: 100%; height: 500px; border: 1px solid #ccc; background: white; border-radius: 8px;"></div>
    
    <div class="info">
        <p>Esta gráfica utiliza datos reales de ambos grupos filtrando por proveedores comunes.</p>
        <a href="/integrations"><button class="btn-volver">Volver</button></a>
    </div>
</main>

<style>
    main {
        padding: 40px;
        text-align: center;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .info {
        margin-top: 20px;
        color: #666;
    }
    .btn-volver {
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
    }
    .btn-volver:hover {
        background-color: #0056b3;
    }
</style>