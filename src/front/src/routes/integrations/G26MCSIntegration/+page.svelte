
<script>
  import { onMount } from "svelte";
  import * as echarts from "echarts";

  let chart;

  const API_FOOD = "https://sos2526-18.onrender.com/api/v2/food-supply-utilization-accounts";
  const API_RANK = "https://sos2526-26.onrender.com/api/v2/national-team-rankings-per-years";

  async function loadData() {
    try {
      const resFood = await fetch(API_FOOD);
      const dataFood = await resFood.json();

      const resRank = await fetch(API_RANK);
      const dataRank = await resRank.json();

      const country = "spain";
      const countryrank = "españa";

      // ✅ años que quieres usar
      const selectedYears = [2018, 2020, 2022];

      const foodFiltered = dataFood.filter(d =>
        d.country_name_en &&
        d.country_name_en.toLowerCase().includes(country) &&
        selectedYears.includes(d.year)
      );

      const rankFiltered = dataRank.filter(d =>
        d.country &&
        d.country.toLowerCase().includes(countryrank) &&
        selectedYears.includes(d.year)
      );

      // ✅ unir por año SOLO en esos años
      const scatterData = [];

      selectedYears.forEach(year => {
        const food = foodFiltered.find(f => f.year === year);
        const rank = rankFiltered.find(r => r.year === year);

        if (food && rank) {
          scatterData.push([
            food.opening_stocks_tonnes,
            rank.rank,
            year
          ]);
        }
      });

      const option = {
        title: {
          text: "Food vs Ranking (2018, 2020, 2022)"
        },
        tooltip: {
          formatter: function (params) {
            return `
              Año: ${params.value[2]}<br/>
              Food: ${params.value[0]}<br/>
              Ranking: ${params.value[1]}
            `;
          }
        },
        xAxis: {
          name: "Opening Stock",
          type: "value"
        },
        yAxis: {
          name: "Ranking FIFA",
          type: "value",
          inverse: true
        },
        series: [
          {
            type: "scatter",
            data: scatterData,
            symbolSize: 15
          }
        ]
      };

      if (chart) chart.dispose();

      chart = echarts.init(document.getElementById("chart"));
      chart.setOption(option);

    } catch (err) {
      console.error("Error cargando datos:", err);
    }
  }

  async function loadInitialData() {
    await fetch("https://sos2526-18.onrender.com/api/v2/food-supply-utilization-accounts/loadInitialData");
    await fetch("https://sos2526-26.onrender.com/api/v2/national-team-rankings-per-years/loadInitialData");

    await loadData();
  }

  onMount(loadData);
</script>


<style>
  #chart {
    width: 900px;
    height: 500px;
    margin: 40px auto;
  }

  button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #008000;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #006400;
  }
</style>

<h2 style="text-align:center;">
  Scatter Food vs Ranking FIFA
</h2>

<div id="chart"></div>

<button onclick={loadInitialData}>
  Cargar datos iniciales
</button>