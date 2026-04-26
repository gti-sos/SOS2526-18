<script>
  import { onMount } from "svelte";
  import Highcharts from "highcharts";

  let chartContainer;

  const API_URL = "/api/v2/food-supply-utilization-accounts";

  onMount(async () => {
    const response = await fetch(API_URL);
    const data = await response.json();

    // ✅ 1. Filtrar SOLO año 2013
    const data2013 = data.filter(d => d.year === 2013);

    // ✅ 2. Agrupar opening stocks por país
    const openingStocksByCountry = {};

    data2013.forEach(d => {
      const country = d.country_name_en;
      const openingStock = d.opening_stocks_tonnes;

      if (!openingStocksByCountry[country]) {
        openingStocksByCountry[country] = 0;
      }

      openingStocksByCountry[country] += openingStock;
    });

    // ✅ 3. Formato para Highcharts (pie)
    const pieData = Object.entries(openingStocksByCountry).map(
      ([country, value]) => ({
        name: country,
        y: value
      })
    );

    // ✅ 4. Crear el gráfico
    Highcharts.chart(chartContainer, {
      chart: {
        type: "pie"   // ✅ no line
      },
      title: {
        text: "Opening stocks by country (2013)"
      },
      tooltip: {
        pointFormat:
          "<b>{point.percentage:.1f}%</b><br/>Tonnes: {point.y}"
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "{point.name}: {point.percentage:.1f}%"
          }
        }
      },
      series: [
        {
          name: "Opening stocks (tonnes)",
          colorByPoint: true,
          data: pieData
        }
      ]
    });
  });
</script>

<h1>Opening stocks by country (2013)</h1>

<div bind:this={chartContainer} style="width:100%; height:500px;"></div>