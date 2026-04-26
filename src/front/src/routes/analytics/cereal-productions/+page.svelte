<script>
    import { onMount } from 'svelte';

    onMount(async () => {
        const Highcharts = (await import('highcharts')).default;

        // 1. CARGA DE DATOS
        let apiData = [];
        try {
            const res = await fetch('/api/v2/cereal-productions');
            apiData = res.ok ? await res.json() : [];
        } catch (e) { 
            console.error("Error API", e); 
        }

<<<<<<< HEAD
        // 2. LÓGICA DE SERIES
=======
        // Datos de respaldo
        const finalData = apiData.length > 0 ? apiData : [
            
        ];

        // 2. LÓGICA DE COLORES Y SERIES
>>>>>>> df8e8a95674228a042bd66a6dc0e481ab46195bb
        const palette = ['#FF4136', '#0074D9', '#2ECC40', '#B10DC9', '#FF851B', '#7FDBFF'];
        let colorIdx = 0;
        let processedSeries = [];

        // Si hay datos, creamos las series por país
        if (apiData.length > 0) {
            const countries = [...new Set(apiData.map(d => d.country))];
            
            countries.forEach(countryName => {
                const countryData = apiData.filter(d => d.country === countryName);
                processedSeries.push({
                    name: countryName, 
                    color: palette[colorIdx % palette.length],
                    data: countryData.map(d => {
                        const landVal = Number(d.land_used);
                        const calcRadius = Math.sqrt(landVal / 40000) + 4;
                        return {
                            x: Number(d.year),
                            y: Number(d.cereal_production),
                            land: d.land_used,
                            pop: d.population,
                            name: d.country,
                            marker: {
                                radius: calcRadius > 35 ? 35 : calcRadius,
                                symbol: 'circle'
                            }
                        };
                    })
                });
                colorIdx++;
            });
        } else {
            // SI NO HAY DATOS: Metemos una serie vacía para que el gráfico pinte los ejes
            processedSeries = [{
                name: 'Sin datos',
                data: []
            }];
        }

        // 3. CONFIGURACIÓN DEL GRÁFICO
        Highcharts.chart('container-uso-tierra', {
            chart: { 
                type: 'scatter', 
                zoomType: 'xy',
                backgroundColor: '#fdfdfd'
            },
            title: { text: 'Análisis de Producción (Tamaño = Uso de Tierra)' },
            xAxis: { 
                title: { text: 'Año' }, 
                gridLineWidth: 1,
                min: 1960, // Ponemos un rango mínimo para que no se vea raro vacío
                max: 2025
            },
            yAxis: { 
                title: { text: 'Producción Total (Toneladas)' },
                type: 'logarithmic',
                min: 1 // Evita errores en escala logarítmica cuando está vacío
            },
            tooltip: {
                useHTML: true,
                headerFormat: '<b>{point.name} ({point.x})</b><br/>',
                pointFormat: 
                    'Producción: <b>{point.y:,.0f} t</b><br/>' +
                    'Uso de Tierra: <b style="color:#2ECC40">{point.land:,.0f} ha</b><br/>' +
                    'Población: <b>{point.pop:,.0f} hab.</b>'
            },
            series: processedSeries
        });
    });
</script>

<main>
    <div id="container-uso-tierra"></div>

    <div class="navigation">
        <a href="/cereal-productions">
            <button class="btn-back">Volver</button>
        </a>
    </div>
</main>

<style>
    main { padding: 20px; }

    #container-uso-tierra {
        width: 100%;
        height: 600px;
        margin: 0 auto;
        border: 1px solid #eee;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        background-color: white; /* Asegura que el contenedor se vea */
    }

    .navigation { margin-top: 20px; text-align: center; }

    .btn-back {
        padding: 10px 30px;
        background-color: #333;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }
</style>