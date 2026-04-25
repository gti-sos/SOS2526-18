<script>
    import { onMount } from 'svelte';

    async function loadData() {
        try {
            const [resJL, resNV, resMC] = await Promise.all([
                fetch('/api/v2/cereal-productions'),
                fetch('/api/v1/cost-of-healthy-diet-by-countries'),
                fetch('/api/v2/food-supply-utilization-accounts')
            ]);
            return {
                dataJL: resJL.ok ? await resJL.json() : [],
                dataNV: resNV.ok ? await resNV.json() : [],
                dataMC: resMC.ok ? await resMC.json() : []
            };
        } catch (e) {
            return { dataJL: [], dataNV: [], dataMC: [] };
        }
    }

    onMount(async () => {
        const Highcharts = (await import('highcharts')).default;
        const { dataJL, dataNV, dataMC } = await loadData();
        const years = [2017, 2018, 2019, 2020, 2021];

        const filterSpain = (data) => data.filter(i => {
            const c = (i.country || i.country_name_en || i.country_en || "").toLowerCase().trim();
            return (c === "spain" || c === "españa") && years.includes(parseInt(i.year));
        });

        const sJL = filterSpain(dataJL);
        const sNV = filterSpain(dataNV);
        const sMC = filterSpain(dataMC);

        const vJL = years.map(y => {
            const e = sJL.find(i => parseInt(i.year) === y);
            return e ? (e.cereal_production || e.production_t || 0) : 0;
        });

        const vNV = years.map(y => {
            const e = sNV.find(i => parseInt(i.year) === y);
            if (!e) return 0;
            // BUSCADOR AUTOMÁTICO: Si no coinciden los nombres, busca el primer valor que sea un número y no sea el año
            const keys = Object.keys(e);
            const valueKey = keys.find(k => k.includes('cost') || k.includes('price') || k.includes('diet')) 
                             || keys.find(k => typeof e[k] === 'number' && e[k] < 100 && k !== 'year');
            
            return e[valueKey] || 0;
        });

        const vMC = years.map(y => {
            const e = sMC.find(i => parseInt(i.year) === y);
            return e ? (e.production_tonnes || e.production_t || 0) : 0;
        });

        Highcharts.chart('container', {
            chart: { type: 'column' },
            title: { text: 'Integración Grupo 18: España' },
            xAxis: { categories: years.map(String) },
            yAxis: [
                { title: { text: 'Toneladas (JLAV/MCS)' }, min: 0 },
                { title: { text: 'Coste Diario (NVD)' }, opposite: true, min: 0 }
            ],
            tooltip: { shared: true },
            series: [
                { name: 'Cereal (JLAV)', data: vJL, color: '#2f7ed8' },
                { name: 'Suministro (MCS)', data: vMC, color: '#8bbc21' },
                { name: 'Coste Dieta (NVD)', data: vNV, yAxis: 1, color: '#f28f43' }
            ]
        });
    });
</script>

<main>
    <h1>Analytics - Grupo 18</h1>
    <div id="container"></div>
    <br>
    <a href="/"><button>Volver al inicio</button></a>
</main>

<style>
    #container { width: 100%; height: 500px; margin: 0 auto; }
    main { text-align: center; padding: 20px; }
</style> 