<script>
  import { onMount } from "svelte";
  import ApexCharts from "apexcharts";

  let chart;

  const API_SAT = "https://sos2526-14-yjus.onrender.com/api/v1/active-satellites";
  const API_FOOD = "https://sos2526-18.onrender.com/api/v2/food-supply-utilization-accounts";

  async function loadData() {
    try {
      const resSat = await fetch(API_SAT);
      const dataSat = await resSat.json();

      const resFood = await fetch(API_FOOD);
      const dataFood = await resFood.json();

      // ✅ países (filtro flexible)
      const countries = ["spain", "china", "egypt"];

      // ✅ SATÉLITES POR PAÍS
      const satByCountry = {};
      countries.forEach(c => satByCountry[c] = 0);

      dataSat.forEach(s => {
        if (!s.country) return;

        const c = s.country.toLowerCase();

        countries.forEach(target => {
          if (c.includes(target)) {   // ✅ filtro poco estricto
            satByCountry[target]++;
          }
        });
      });

      // ✅ IMPORTACIONES POR PAÍS (escala ajustada)
      const importByCountry = {};
      countries.forEach(c => importByCountry[c] = 0);

      dataFood.forEach(f => {
        if (!f.country_name_en || !f.import_quantity_tonnes) return;

        const c = f.country_name_en.toLowerCase();

        countries.forEach(target => {
          if (c.includes(target)) {   // ✅ filtro poco estricto
            importByCountry[target] += Number(f.import_quantity_tonnes) || 0;
          }
        });
      });

      // ✅ CREAR DATOS BUBBLE (escala visual)
      const bubbleData = countries.map((c, i) => ({
        x: i,
        y: satByCountry[c] || 0,
        z: (importByCountry[c] || 0) / 1000 // ✅ escala más manejable
      }));

      const options = {
        chart: {
          type: "bubble"
        },

        series: [{
          name: "Países",
          data: bubbleData
        }],

        title: {
          text: "Satélites vs Importaciones (España, China, Egipto)"
        },

        xaxis: {
          categories: ["España", "China", "Egipto"],
          title: {
            text: "País"
          }
        },

        yaxis: {
          title: {
            text: "Número de satélites"
          }
        },

        plotOptions: {
          bubble: {
            minBubbleRadius: 10,
            maxBubbleRadius: 40
          }
        },

        fill: {
          opacity: 0.8,
          colors: ["#e74c3c", "#3498db", "#2ecc71"]
        },

        dataLabels: {
          enabled: true,
          formatter: function(val, opts) {
            return ["Spain","China","Egypt"][opts.dataPointIndex];
          }
        },

        tooltip: {
          custom: function({ seriesIndex, dataPointIndex, w }) {
            const countryNames = ["España", "China", "Egipto"];
            const point = w.config.series[seriesIndex].data[dataPointIndex];

            return `
              <div style="padding:10px">
                <b>${countryNames[dataPointIndex]}</b><br/>
                Satélites: ${point.y}<br/>
                Importaciones: ${(point.z * 1000).toFixed(0)}
              </div>
            `;
          }
        }
      };

      if (chart) chart.destroy();

      chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();

    } catch (err) {
      console.error("Error:", err);
    }
  }

  async function loadInitialData() {
    try {
      await fetch(API_SAT + "/loadInitialData");
      await fetch(API_FOOD + "/loadInitialData");
      await loadData();
    } catch (err) {
      console.error("Error loadInitialData:", err);
    }
  }

  onMount(loadData);
</script>

<style>
  #chart {
    height: 500px;
    max-width: 900px;
    margin: 40px auto;
  }

  button {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color: #0077cc;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #005fa3;
  }
</style>

<h2 style="text-align:center;">
  Bubble Chart Satélites vs Importaciones
</h2>

<div id="chart"></div>

<button onclick={loadInitialData}>
  Cargar datos iniciales
</button>