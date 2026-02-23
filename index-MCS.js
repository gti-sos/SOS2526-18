const data = [
  {
    faostat: 41,
    m49_code: 156,
    country_name_en: "China, mainland",
    item_code: 221,
    item: "Almonds, in shell",
    year: 2017,
    opening_stocks_tonnes: 9951.89,
    production_tonnes: 43000,
    import_quantity_tonnes: 5497.24,
    stock_variation_tonnes: 125.76,
    export_quantity_tonnes: 89.23
  },
  {
    faostat: 41,
    m49_code: 156,
    country_name_en: "China, mainland",
    item_code: 221,
    item: "Almonds, in shell",
    year: 2014,
    opening_stocks_tonnes: 9912.8,
    production_tonnes: 42905.09,
    import_quantity_tonnes: 1115.41,
    stock_variation_tonnes: -71.66,
    export_quantity_tonnes: 0.12
  },
  {
    faostat: 41,
    m49_code: 156,
    country_name_en: "China, mainland",
    item_code: 221,
    item: "Almonds, in shell",
    year: 2016,
    opening_stocks_tonnes: 9904.78,
    production_tonnes: 43212.01,
    import_quantity_tonnes: 4115.63,
    stock_variation_tonnes: 47.11,
    export_quantity_tonnes: 309.36
  },
  {
    faostat: 52,
    m49_code: 31,
    country_name_en: "Azerbaijan",
    item_code: 221,
    item: "Almonds, in shell",
    year: 2010,
    opening_stocks_tonnes: 99.99,
    production_tonnes: 521,
    import_quantity_tonnes: 379,
    stock_variation_tonnes: 19.83,
    export_quantity_tonnes: 0
  },
  {
    faostat: 118,
    m49_code: 414,
    country_name_en: "Kuwait",
    item_code: 221,
    item: "Almonds, in shell",
    year: 2011,
    opening_stocks_tonnes: 99.02,
    production_tonnes: null, // vacío en tu tabla
    import_quantity_tonnes: 113,
    stock_variation_tonnes: -63.02,
    export_quantity_tonnes: 20
  },
  {
    faostat: 41,
    m49_code: 156,
    country_name_en: "China, mainland",
    item_code: 221,
    item: "Almonds, in shell",
    year: 2015,
    opening_stocks_tonnes: 9841.14,
    production_tonnes: 43079.54,
    import_quantity_tonnes: 4151.48,
    stock_variation_tonnes: 63.64,
    export_quantity_tonnes: 23.85
  },
  {
    faostat: 59,
    m49_code: 818,
    country_name_en: "Egypt",
    item_code: 221,
    item: "Almonds, in shell",
    year: 2013,
    opening_stocks_tonnes: 983.58,
    production_tonnes: null, // vacío
    import_quantity_tonnes: 1530,
    stock_variation_tonnes: -690.58,
    export_quantity_tonnes: 65
  },
  {
    faostat: 235,
    m49_code: 860,
    country_name_en: "Uzbekistan",
    item_code: 221,
    item: "Almonds, in shell",
    year: 2010,
    opening_stocks_tonnes: 9803.03,
    production_tonnes: 18000,
    import_quantity_tonnes: null, // vacío
    stock_variation_tonnes: -369.64,
    export_quantity_tonnes: 19
  },
  {
    faostat: 112,
    m49_code: 400,
    country_name_en: "Jordan",
    item_code: 221,
    item: "Almonds, in shell",
    year: 2013,
    opening_stocks_tonnes: 978.13,
    production_tonnes: 2143,
    import_quantity_tonnes: 531,
    stock_variation_tonnes: -450.93,
    export_quantity_tonnes: 38
  },
  {
    faostat: 27,
    m49_code: 100,
    country_name_en: "Bulgaria",
    item_code: 221,
    item: "Almonds, in shell",
    year: 2019,
    opening_stocks_tonnes: 95.85,
    production_tonnes: 720,
    import_quantity_tonnes: 16.42,
    stock_variation_tonnes: 11.61,
    export_quantity_tonnes: 23.44
  }
];

function avgperCountry(data, Country, attribute) {
    //filter country
    const dataCountry=data.filter(row=>row.country_name_en===Country);
    //filter attribute
    const values=dataCountry.map(row=>row[attribute]).filter(v => typeof v === "number" && !isNaN(v));
    console.log()
    //
    if (values.length === 0) return null;
    //
    const sum=values.reduce((acum,n)=>acum+n,0);
    return sum/values.length;
}


// console.log(cool());
let express = require('express');
const app = express();
let avg=avgperCountry(data,"China, mainland","production_tonnes");
app.get('/samples/MCS', (req, res) => {
res.send("Average production in tonnes of mainland China: "+avg);
})

app.listen(3000, () => {
console.log('Server is running on http://localhost:3000');
})