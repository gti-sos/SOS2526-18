<script>
    import { onMount } from 'svelte';

    // 1. Aquí pedimos los datos a las APIs
    async function loadData() {
        const [resJL, resNV, resMC] = await Promise.all([
            fetch('/api/v1/cereal-productions'),
            fetch('/api/v1/cost-of-healthy-diet-by-countries'),
            fetch('/api/v1/food-supply-utilization-accounts')
        ]);
        
        let dataJL = resJL.ok ? await resJL.json() : [];
        let dataNV = resNV.ok ? await resNV.json() : [];
        let dataMC = resMC.ok ? await resMC.json() : [];
        
        return { dataJL, dataNV, dataMC };
    }

    onMount(async () => {
        // Importamos la librería JS de Highcharts
        const Highcharts = (await import('highcharts')).default;
        
        // Obtenemos los datos
        const { dataJL, dataNV, dataMC } = await loadData();

        // Mapeamos los campos (ajusta production_t si es necesario)
        const valuesJL = dataJL.map(i => i.production_t || i.production || 0);
        const valuesNV = dataNV.map(i => i.cost || i.price || 0);
        const valuesMC = dataMC.map(i => i.food_supply_t || i.amount || 0);
        const categories = dataJL.map(i => `${i.country || i.country_en} (${i.year})`);

        // 2. AQUÍ VA EL CÓDIGO JS QUE COPIASTE DE LA WEB
        Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Gráfica Integrada - Grupo 18'
            },
            xAxis: {
                categories: categories,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: { text: 'Valores' }
            },
            series: [
                { name: 'Cereal (JLAV)', data: valuesJL.slice(0, 10) },
                { name: 'Diet (NVD)', data: valuesNV.slice(0, 10) },
                { name: 'Supply (MCS)', data: valuesMC.slice(0, 10) }
            ]
        });
    });
</script>

<main>
    <h1>Analytics</h1>
    <div id="container"></div>
    <br>
    <a href="/"><button>Volver al inicio</button></a>
</main>

<style>
    #container {
        width: 100%;
        height: 400px;
        margin: 0 auto;
    }
    main {
        text-align: center;
        padding: 20px;
    }
</style>