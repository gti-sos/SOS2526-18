<script>
  import { onMount } from "svelte";
  import ApexCharts from "apexcharts";

  let chart;

  const API1 = "https://sos2526-15.onrender.com/api/v2/happiness-indices";
  const API2 = "https://sos2526-18.onrender.com/api/v2/food-supply-utilization-accounts";

  async function loadData() {
    try {
      const res1 = await fetch(API1);
      const data1 = await res1.json();

      const res2 = await fetch(API2);
      const data2 = await res2.json();

      const spainHappiness = data1.filter(d =>
        d.country &&
        d.country.toLowerCase() === "spain" &&
        d.year >= 2020 &&
        d.year <= 2023
      );

      const spainFood = data2.filter(d =>
        d.country_name_en &&
        d.country_name_en.toLowerCase().includes("spain") &&
        d.year >= 2020 &&
        d.year <= 2023
      );

      const years = [2020, 2021, 2022, 2023];

      // ✅ GDP CORREGIDO (×1000)
      const gdpData = years.map(y => {
        const item = spainHappiness.find(d => d.year === y);
        return item
          ? parseFloat(item.gdp_per_capita.toString().replace(",", ".")) * 1000
          : 0;
      });

      const stockData = years.map(y => {
        const item = spainFood.find(d => d.year === y);
        return item ? item.opening_stocks_tonnes : 0;
      });

      const series = [
        {
          name: "GDP per Capita",
          data: gdpData
        },
        {
          name: "Opening Stock",
          data: stockData
        }
      ];

      const options = {
        chart: {
          type: "bar",
          stacked: false
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "50%"
          }
        },
        series: series,
        xaxis: {
          categories: years,
          title: {
            text: "Año"
          }
        },
        yaxis: [
          {
            title: {
              text: "GDP (0 - 1900)"
            },
            min: 0,
            max: 1900
          },
          {
            opposite: true,
            title: {
              text: "Opening Stock (0 - 30000)"
            },
            min: 0,
            max: 30000
          }
        ],
        tooltip: {
          y: {
            formatter: (val) => val.toFixed(0)
          }
        },
        title: {
          text: "España (2020-2023) - GDP vs Opening Stock"
        },
        legend: {
          position: "top"
        }
      };

      if (chart) chart.destroy();

      chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();

    } catch (err) {
      console.error("Error cargando datos:", err);
    }
  }

  async function loadInitialData() {
    await fetch("https://sos2526-15.onrender.com/api/v2/happiness-indices/loadInitialData");
    await fetch("https://sos2526-18.onrender.com/api/v2/food-supply-utilization-accounts/loadInitialData");

    await loadData();
  }

  onMount(loadData);
</script>

<div id="chart"></div>

<button onclick={loadInitialData}>
  Cargar datos iniciales
</button>
