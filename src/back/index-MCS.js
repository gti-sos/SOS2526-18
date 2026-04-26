import express from "express";

const datamcs = [
  {
    "faostat": 9,
    "m49_code": 32,
    "country_name_en": "Argentina",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2021,
    "opening_stocks_tonnes": 341.71,
    "production_tonnes": 712.29,
    "import_quantity_tonnes": 10.21,
    "stock_variation_tonnes": 36.1,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 9,
    "m49_code": 32,
    "country_name_en": "Argentina",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2020,
    "opening_stocks_tonnes": 148.8,
    "production_tonnes": 693.01,
    "import_quantity_tonnes": 16.21,
    "stock_variation_tonnes": 192.91,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 9,
    "m49_code": 32,
    "country_name_en": "Argentina",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2016,
    "opening_stocks_tonnes": 148.8,
    "production_tonnes": 751.13,
    "import_quantity_tonnes": 30.62,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 735.24
  },
  {
    "faostat": 9,
    "m49_code": 32,
    "country_name_en": "Argentina",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2018,
    "opening_stocks_tonnes": 148.8,
    "production_tonnes": 802.24,
    "import_quantity_tonnes": 36.97,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 9,
    "m49_code": 32,
    "country_name_en": "Argentina",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2013,
    "opening_stocks_tonnes": 0,
    "production_tonnes": 669.03,
    "import_quantity_tonnes": 96,
    "stock_variation_tonnes": 148.8,
    "export_quantity_tonnes": 0
  },
  {
    "faostat": 9,
    "m49_code": 32,
    "country_name_en": "Argentina",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2017,
    "opening_stocks_tonnes": 148.8,
    "production_tonnes": 776.68,
    "import_quantity_tonnes": 40.82,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 9,
    "m49_code": 32,
    "country_name_en": "Argentina",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2010,
    "opening_stocks_tonnes": 0,
    "production_tonnes": 620,
    "import_quantity_tonnes": 109,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 0
  },
  {
    "faostat": 9,
    "m49_code": 32,
    "country_name_en": "Argentina",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2011,
    "opening_stocks_tonnes": 0,
    "production_tonnes": 620,
    "import_quantity_tonnes": 94,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 0
  },
  {
    "faostat": 9,
    "m49_code": 32,
    "country_name_en": "Argentina",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2014,
    "opening_stocks_tonnes": 148.8,
    "production_tonnes": 688.86,
    "import_quantity_tonnes": 53.39,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 9,
    "m49_code": 32,
    "country_name_en": "Argentina",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2023,
    "opening_stocks_tonnes": 439.62,
    "production_tonnes": 720.12,
    "import_quantity_tonnes": "",
    "stock_variation_tonnes": 58.66,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 9,
    "m49_code": 32,
    "country_name_en": "Argentina",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2012,
    "opening_stocks_tonnes": 0,
    "production_tonnes": 650,
    "import_quantity_tonnes": 111,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 0
  },
  {
    "faostat": 9,
    "m49_code": 32,
    "country_name_en": "Argentina",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2015,
    "opening_stocks_tonnes": 148.8,
    "production_tonnes": 722.92,
    "import_quantity_tonnes": 20.41,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 22.3
  },
  {
    "faostat": 9,
    "m49_code": 32,
    "country_name_en": "Argentina",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2019,
    "opening_stocks_tonnes": 148.8,
    "production_tonnes": 696.93,
    "import_quantity_tonnes": "",
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 9,
    "m49_code": 32,
    "country_name_en": "Argentina",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2022,
    "opening_stocks_tonnes": 377.82,
    "production_tonnes": 715,
    "import_quantity_tonnes": 10.21,
    "stock_variation_tonnes": 61.8,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 41,
    "m49_code": 156,
    "country_name_en": "China, mainland",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2012,
    "opening_stocks_tonnes": 9747.33,
    "production_tonnes": 43000,
    "import_quantity_tonnes": 2759,
    "stock_variation_tonnes": -3.17,
    "export_quantity_tonnes": 122
  },
  {
    "faostat": 41,
    "m49_code": 156,
    "country_name_en": "China, mainland",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2019,
    "opening_stocks_tonnes": 10673.27,
    "production_tonnes": 45000,
    "import_quantity_tonnes": 63496.1,
    "stock_variation_tonnes": 295.25,
    "export_quantity_tonnes": 147.94
  },
  {
    "faostat": 41,
    "m49_code": 156,
    "country_name_en": "China, mainland",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2021,
    "opening_stocks_tonnes": 11216.72,
    "production_tonnes": 84000,
    "import_quantity_tonnes": 75973.13,
    "stock_variation_tonnes": 578.68,
    "export_quantity_tonnes": 26.47
  },
  {
    "faostat": 41,
    "m49_code": 156,
    "country_name_en": "China, mainland",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2014,
    "opening_stocks_tonnes": 9912.8,
    "production_tonnes": 42905.09,
    "import_quantity_tonnes": 1115.41,
    "stock_variation_tonnes": -71.66,
    "export_quantity_tonnes": 0.12
  },
  {
    "faostat": 41,
    "m49_code": 156,
    "country_name_en": "China, mainland",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2020,
    "opening_stocks_tonnes": 10968.52,
    "production_tonnes": 45000,
    "import_quantity_tonnes": 45917.21,
    "stock_variation_tonnes": 248.2,
    "export_quantity_tonnes": 125.19
  },
  {
    "faostat": 41,
    "m49_code": 156,
    "country_name_en": "China, mainland",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2016,
    "opening_stocks_tonnes": 9904.78,
    "production_tonnes": 43212.01,
    "import_quantity_tonnes": 4115.63,
    "stock_variation_tonnes": 47.11,
    "export_quantity_tonnes": 309.36
  },
  {
    "faostat": 41,
    "m49_code": 156,
    "country_name_en": "China, mainland",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2013,
    "opening_stocks_tonnes": 9744.16,
    "production_tonnes": 43000,
    "import_quantity_tonnes": 6564,
    "stock_variation_tonnes": 168.64,
    "export_quantity_tonnes": 0
  },
  {
    "faostat": 41,
    "m49_code": 156,
    "country_name_en": "China, mainland",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2022,
    "opening_stocks_tonnes": 11795.4,
    "production_tonnes": 104000,
    "import_quantity_tonnes": 79258.33,
    "stock_variation_tonnes": 605.96,
    "export_quantity_tonnes": 159.28
  },
  {
    "faostat": 41,
    "m49_code": 156,
    "country_name_en": "China, mainland",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2015,
    "opening_stocks_tonnes": 9841.14,
    "production_tonnes": 43079.54,
    "import_quantity_tonnes": 4151.48,
    "stock_variation_tonnes": 63.64,
    "export_quantity_tonnes": 23.85
  },
  {
    "faostat": 41,
    "m49_code": 156,
    "country_name_en": "China, mainland",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2023,
    "opening_stocks_tonnes": 12401.37,
    "production_tonnes": 10000,
    "import_quantity_tonnes": 66665.24,
    "stock_variation_tonnes": 195.88,
    "export_quantity_tonnes": 1295.22
  },
  {
    "faostat": 41,
    "m49_code": 156,
    "country_name_en": "China, mainland",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2011,
    "opening_stocks_tonnes": 9766.7,
    "production_tonnes": 42000,
    "import_quantity_tonnes": 2065,
    "stock_variation_tonnes": -19.37,
    "export_quantity_tonnes": 255
  },
  {
    "faostat": 41,
    "m49_code": 156,
    "country_name_en": "China, mainland",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2018,
    "opening_stocks_tonnes": 10077.64,
    "production_tonnes": 43000,
    "import_quantity_tonnes": 15643.13,
    "stock_variation_tonnes": 595.63,
    "export_quantity_tonnes": 201.71
  },
  {
    "faostat": 41,
    "m49_code": 156,
    "country_name_en": "China, mainland",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2017,
    "opening_stocks_tonnes": 9951.89,
    "production_tonnes": 43000,
    "import_quantity_tonnes": 5497.24,
    "stock_variation_tonnes": 125.76,
    "export_quantity_tonnes": 89.23
  },
  {
    "faostat": 41,
    "m49_code": 156,
    "country_name_en": "China, mainland",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2010,
    "opening_stocks_tonnes": 9664.04,
    "production_tonnes": 38000,
    "import_quantity_tonnes": 4653,
    "stock_variation_tonnes": 102.66,
    "export_quantity_tonnes": 138
  },
  {
    "faostat": 54,
    "m49_code": 208,
    "country_name_en": "Denmark",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2012,
    "opening_stocks_tonnes": 20.48,
    "production_tonnes": "",
    "import_quantity_tonnes": 130,
    "stock_variation_tonnes": -20.48,
    "export_quantity_tonnes": 11
  },
  {
    "faostat": 54,
    "m49_code": 208,
    "country_name_en": "Denmark",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2022,
    "opening_stocks_tonnes": 782.61,
    "production_tonnes": "",
    "import_quantity_tonnes": 619.71,
    "stock_variation_tonnes": 156.26,
    "export_quantity_tonnes": 12.99
  },
  {
    "faostat": 54,
    "m49_code": 208,
    "country_name_en": "Denmark",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2011,
    "opening_stocks_tonnes": 20.48,
    "production_tonnes": "",
    "import_quantity_tonnes": 144,
    "stock_variation_tonnes": 0.13,
    "export_quantity_tonnes": 5
  },
  {
    "faostat": 54,
    "m49_code": 208,
    "country_name_en": "Denmark",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2023,
    "opening_stocks_tonnes": 938.87,
    "production_tonnes": "",
    "import_quantity_tonnes": 361.65,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 12.59
  },
  {
    "faostat": 54,
    "m49_code": 208,
    "country_name_en": "Denmark",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2014,
    "opening_stocks_tonnes": 49.2,
    "production_tonnes": "",
    "import_quantity_tonnes": 160.29,
    "stock_variation_tonnes": -17.51,
    "export_quantity_tonnes": 7.67
  },
  {
    "faostat": 54,
    "m49_code": 208,
    "country_name_en": "Denmark",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2015,
    "opening_stocks_tonnes": 31.69,
    "production_tonnes": "",
    "import_quantity_tonnes": 90.74,
    "stock_variation_tonnes": -31.69,
    "export_quantity_tonnes": 1.31
  },
  {
    "faostat": 54,
    "m49_code": 208,
    "country_name_en": "Denmark",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2018,
    "opening_stocks_tonnes": 0,
    "production_tonnes": "",
    "import_quantity_tonnes": 414.7,
    "stock_variation_tonnes": 226.46,
    "export_quantity_tonnes": 13.04
  },
  {
    "faostat": 54,
    "m49_code": 208,
    "country_name_en": "Denmark",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2019,
    "opening_stocks_tonnes": 226.46,
    "production_tonnes": "",
    "import_quantity_tonnes": 744.59,
    "stock_variation_tonnes": 138.51,
    "export_quantity_tonnes": 7.6
  },
  {
    "faostat": 54,
    "m49_code": 208,
    "country_name_en": "Denmark",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2013,
    "opening_stocks_tonnes": 0,
    "production_tonnes": "",
    "import_quantity_tonnes": 265,
    "stock_variation_tonnes": 49.2,
    "export_quantity_tonnes": 19
  },
  {
    "faostat": 54,
    "m49_code": 208,
    "country_name_en": "Denmark",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2010,
    "opening_stocks_tonnes": 56.29,
    "production_tonnes": "",
    "import_quantity_tonnes": 104,
    "stock_variation_tonnes": -35.94,
    "export_quantity_tonnes": 2
  },
  {
    "faostat": 54,
    "m49_code": 208,
    "country_name_en": "Denmark",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2020,
    "opening_stocks_tonnes": 364.97,
    "production_tonnes": "",
    "import_quantity_tonnes": 720.24,
    "stock_variation_tonnes": 177.72,
    "export_quantity_tonnes": 11.01
  },
  {
    "faostat": 54,
    "m49_code": 208,
    "country_name_en": "Denmark",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2021,
    "opening_stocks_tonnes": 542.69,
    "production_tonnes": "",
    "import_quantity_tonnes": 1052.05,
    "stock_variation_tonnes": 239.92,
    "export_quantity_tonnes": 94.58
  },
  {
    "faostat": 54,
    "m49_code": 208,
    "country_name_en": "Denmark",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2017,
    "opening_stocks_tonnes": 0,
    "production_tonnes": "",
    "import_quantity_tonnes": 131.3,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 14.1
  },
  {
    "faostat": 54,
    "m49_code": 208,
    "country_name_en": "Denmark",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2016,
    "opening_stocks_tonnes": 0,
    "production_tonnes": "",
    "import_quantity_tonnes": 141.6,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 6.26
  },
  {
    "faostat": 84,
    "m49_code": 300,
    "country_name_en": "Greece",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2023,
    "opening_stocks_tonnes": 9399.95,
    "production_tonnes": 36730,
    "import_quantity_tonnes": 108.28,
    "stock_variation_tonnes": 722.6,
    "export_quantity_tonnes": 49.31
  },
  {
    "faostat": 84,
    "m49_code": 300,
    "country_name_en": "Greece",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2011,
    "opening_stocks_tonnes": "",
    "production_tonnes": 29800,
    "import_quantity_tonnes": 333,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": 59
  },
  {
    "faostat": 84,
    "m49_code": 300,
    "country_name_en": "Greece",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2017,
    "opening_stocks_tonnes": 3992.01,
    "production_tonnes": 42999,
    "import_quantity_tonnes": 330.01,
    "stock_variation_tonnes": -116.03,
    "export_quantity_tonnes": 153.2
  },
  {
    "faostat": 84,
    "m49_code": 300,
    "country_name_en": "Greece",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2012,
    "opening_stocks_tonnes": "",
    "production_tonnes": 29000,
    "import_quantity_tonnes": 295,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": 37
  },
  {
    "faostat": 84,
    "m49_code": 300,
    "country_name_en": "Greece",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2010,
    "opening_stocks_tonnes": "",
    "production_tonnes": 32900,
    "import_quantity_tonnes": 283,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": 40
  },
  {
    "faostat": 84,
    "m49_code": 300,
    "country_name_en": "Greece",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2020,
    "opening_stocks_tonnes": 7102.21,
    "production_tonnes": 28240,
    "import_quantity_tonnes": 298.51,
    "stock_variation_tonnes": 466.64,
    "export_quantity_tonnes": 43.06
  },
  {
    "faostat": 84,
    "m49_code": 300,
    "country_name_en": "Greece",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2022,
    "opening_stocks_tonnes": 8294.56,
    "production_tonnes": 39680,
    "import_quantity_tonnes": 242.3,
    "stock_variation_tonnes": 1105.39,
    "export_quantity_tonnes": 111.11
  },
  {
    "faostat": 84,
    "m49_code": 300,
    "country_name_en": "Greece",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2014,
    "opening_stocks_tonnes": 4297,
    "production_tonnes": 36898.18,
    "import_quantity_tonnes": 272.33,
    "stock_variation_tonnes": -99.38,
    "export_quantity_tonnes": 52.43
  },
  {
    "faostat": 84,
    "m49_code": 300,
    "country_name_en": "Greece",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2016,
    "opening_stocks_tonnes": 4096.16,
    "production_tonnes": 38562.92,
    "import_quantity_tonnes": 235.59,
    "stock_variation_tonnes": -104.14,
    "export_quantity_tonnes": 61
  },
  {
    "faostat": 84,
    "m49_code": 300,
    "country_name_en": "Greece",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2013,
    "opening_stocks_tonnes": "",
    "production_tonnes": 21200,
    "import_quantity_tonnes": 310,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": 25
  },
  {
    "faostat": 84,
    "m49_code": 300,
    "country_name_en": "Greece",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2018,
    "opening_stocks_tonnes": 3875.99,
    "production_tonnes": 48545.51,
    "import_quantity_tonnes": 303.65,
    "stock_variation_tonnes": 2864.92,
    "export_quantity_tonnes": 35.47
  },
  {
    "faostat": 84,
    "m49_code": 300,
    "country_name_en": "Greece",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2019,
    "opening_stocks_tonnes": 6740.91,
    "production_tonnes": 21950,
    "import_quantity_tonnes": 211.93,
    "stock_variation_tonnes": 361.3,
    "export_quantity_tonnes": 47.77
  },
  {
    "faostat": 84,
    "m49_code": 300,
    "country_name_en": "Greece",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2015,
    "opening_stocks_tonnes": 4197.62,
    "production_tonnes": 37564.91,
    "import_quantity_tonnes": 162.52,
    "stock_variation_tonnes": -101.47,
    "export_quantity_tonnes": 21.64
  },
  {
    "faostat": 84,
    "m49_code": 300,
    "country_name_en": "Greece",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2021,
    "opening_stocks_tonnes": 7568.85,
    "production_tonnes": 26790,
    "import_quantity_tonnes": 298.03,
    "stock_variation_tonnes": 725.71,
    "export_quantity_tonnes": 69.86
  },
  {
    "faostat": 106,
    "m49_code": 380,
    "country_name_en": "Italy",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2016,
    "opening_stocks_tonnes": 14579.88,
    "production_tonnes": 74584.1,
    "import_quantity_tonnes": 1773.46,
    "stock_variation_tonnes": -7.08,
    "export_quantity_tonnes": 1089.62
  },
  {
    "faostat": 106,
    "m49_code": 380,
    "country_name_en": "Italy",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2020,
    "opening_stocks_tonnes": 14511.37,
    "production_tonnes": 80520,
    "import_quantity_tonnes": 1876.95,
    "stock_variation_tonnes": -2.46,
    "export_quantity_tonnes": 312.14
  },
  {
    "faostat": 106,
    "m49_code": 380,
    "country_name_en": "Italy",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2011,
    "opening_stocks_tonnes": "",
    "production_tonnes": 104790,
    "import_quantity_tonnes": 1823,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 106,
    "m49_code": 380,
    "country_name_en": "Italy",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2023,
    "opening_stocks_tonnes": 14508.91,
    "production_tonnes": 77680,
    "import_quantity_tonnes": 1765.47,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 1656.94
  },
  {
    "faostat": 106,
    "m49_code": 380,
    "country_name_en": "Italy",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2017,
    "opening_stocks_tonnes": 14572.8,
    "production_tonnes": 79599,
    "import_quantity_tonnes": 2106.17,
    "stock_variation_tonnes": -45.21,
    "export_quantity_tonnes": 940.66
  },
  {
    "faostat": 106,
    "m49_code": 380,
    "country_name_en": "Italy",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2021,
    "opening_stocks_tonnes": 14508.91,
    "production_tonnes": 71620,
    "import_quantity_tonnes": 1929.11,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 3604.77
  },
  {
    "faostat": 106,
    "m49_code": 380,
    "country_name_en": "Italy",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2012,
    "opening_stocks_tonnes": "",
    "production_tonnes": 89865,
    "import_quantity_tonnes": 1183,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 106,
    "m49_code": 380,
    "country_name_en": "Italy",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2015,
    "opening_stocks_tonnes": 14625.2,
    "production_tonnes": 70399,
    "import_quantity_tonnes": 1947.54,
    "stock_variation_tonnes": -45.32,
    "export_quantity_tonnes": 551.08
  },
  {
    "faostat": 106,
    "m49_code": 380,
    "country_name_en": "Italy",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2018,
    "opening_stocks_tonnes": 14527.6,
    "production_tonnes": 79801,
    "import_quantity_tonnes": 2074.63,
    "stock_variation_tonnes": -18.19,
    "export_quantity_tonnes": 601.89
  },
  {
    "faostat": 106,
    "m49_code": 380,
    "country_name_en": "Italy",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2013,
    "opening_stocks_tonnes": "",
    "production_tonnes": 72584.4,
    "import_quantity_tonnes": 1621,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 106,
    "m49_code": 380,
    "country_name_en": "Italy",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2014,
    "opening_stocks_tonnes": 14696.88,
    "production_tonnes": 74016.3,
    "import_quantity_tonnes": 1876.97,
    "stock_variation_tonnes": -71.68,
    "export_quantity_tonnes": 465.36
  },
  {
    "faostat": 106,
    "m49_code": 380,
    "country_name_en": "Italy",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2010,
    "opening_stocks_tonnes": "",
    "production_tonnes": 108160,
    "import_quantity_tonnes": 1098,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 106,
    "m49_code": 380,
    "country_name_en": "Italy",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2022,
    "opening_stocks_tonnes": 14508.91,
    "production_tonnes": 74590,
    "import_quantity_tonnes": 1857.12,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 3836.84
  },
  {
    "faostat": 106,
    "m49_code": 380,
    "country_name_en": "Italy",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2019,
    "opening_stocks_tonnes": 14509.41,
    "production_tonnes": 77300,
    "import_quantity_tonnes": 2339.92,
    "stock_variation_tonnes": 1.96,
    "export_quantity_tonnes": 448.31
  },
  {
    "faostat": 143,
    "m49_code": 504,
    "country_name_en": "Morocco",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2011,
    "opening_stocks_tonnes": 19302.26,
    "production_tonnes": 96231,
    "import_quantity_tonnes": 21,
    "stock_variation_tonnes": 0.11,
    "export_quantity_tonnes": 58
  },
  {
    "faostat": 143,
    "m49_code": 504,
    "country_name_en": "Morocco",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2012,
    "opening_stocks_tonnes": 19302.26,
    "production_tonnes": 99067,
    "import_quantity_tonnes": 0,
    "stock_variation_tonnes": 1.4,
    "export_quantity_tonnes": 0
  },
  {
    "faostat": 143,
    "m49_code": 504,
    "country_name_en": "Morocco",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2020,
    "opening_stocks_tonnes": 19291.47,
    "production_tonnes": 134435.76,
    "import_quantity_tonnes": 14.1,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 0.25
  },
  {
    "faostat": 143,
    "m49_code": 504,
    "country_name_en": "Morocco",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2023,
    "opening_stocks_tonnes": 19291.47,
    "production_tonnes": 146058.72,
    "import_quantity_tonnes": 8.53,
    "stock_variation_tonnes": -0.42,
    "export_quantity_tonnes": 1.97
  },
  {
    "faostat": 143,
    "m49_code": 504,
    "country_name_en": "Morocco",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2017,
    "opening_stocks_tonnes": 19295.25,
    "production_tonnes": 116923.46,
    "import_quantity_tonnes": 0.61,
    "stock_variation_tonnes": -2.36,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 143,
    "m49_code": 504,
    "country_name_en": "Morocco",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2010,
    "opening_stocks_tonnes": 19301.47,
    "production_tonnes": 87104,
    "import_quantity_tonnes": 0,
    "stock_variation_tonnes": 0.68,
    "export_quantity_tonnes": 13
  },
  {
    "faostat": 143,
    "m49_code": 504,
    "country_name_en": "Morocco",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2016,
    "opening_stocks_tonnes": 19290.51,
    "production_tonnes": 112680.53,
    "import_quantity_tonnes": 3.55,
    "stock_variation_tonnes": 4.74,
    "export_quantity_tonnes": 3.55
  },
  {
    "faostat": 143,
    "m49_code": 504,
    "country_name_en": "Morocco",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2021,
    "opening_stocks_tonnes": 19291.47,
    "production_tonnes": 169255,
    "import_quantity_tonnes": 19.05,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 0.68
  },
  {
    "faostat": 143,
    "m49_code": 504,
    "country_name_en": "Morocco",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2022,
    "opening_stocks_tonnes": 19291.47,
    "production_tonnes": 175763,
    "import_quantity_tonnes": 40.5,
    "stock_variation_tonnes": -0.48,
    "export_quantity_tonnes": 0.54
  },
  {
    "faostat": 143,
    "m49_code": 504,
    "country_name_en": "Morocco",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2013,
    "opening_stocks_tonnes": 19303.66,
    "production_tonnes": 93310.3,
    "import_quantity_tonnes": 1,
    "stock_variation_tonnes": 1.14,
    "export_quantity_tonnes": 0
  },
  {
    "faostat": 143,
    "m49_code": 504,
    "country_name_en": "Morocco",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2014,
    "opening_stocks_tonnes": 19304.8,
    "production_tonnes": 101025.71,
    "import_quantity_tonnes": 0.36,
    "stock_variation_tonnes": -3.55,
    "export_quantity_tonnes": 79
  },
  {
    "faostat": 143,
    "m49_code": 504,
    "country_name_en": "Morocco",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2019,
    "opening_stocks_tonnes": 19291.51,
    "production_tonnes": 102185.44,
    "import_quantity_tonnes": 2.35,
    "stock_variation_tonnes": -0.03,
    "export_quantity_tonnes": 3.15
  },
  {
    "faostat": 143,
    "m49_code": 504,
    "country_name_en": "Morocco",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2018,
    "opening_stocks_tonnes": 19292.89,
    "production_tonnes": 117270.04,
    "import_quantity_tonnes": 38.94,
    "stock_variation_tonnes": -1.38,
    "export_quantity_tonnes": 0.18
  },
  {
    "faostat": 143,
    "m49_code": 504,
    "country_name_en": "Morocco",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2015,
    "opening_stocks_tonnes": 19301.25,
    "production_tonnes": 97722.96,
    "import_quantity_tonnes": 0.8,
    "stock_variation_tonnes": -10.74,
    "export_quantity_tonnes": 0.02
  },
  {
    "faostat": 203,
    "m49_code": 724,
    "country_name_en": "Spain",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2018,
    "opening_stocks_tonnes": 28711,
    "production_tonnes": 339033,
    "import_quantity_tonnes": 2348.59,
    "stock_variation_tonnes": -1722.18,
    "export_quantity_tonnes": 4868.58
  },
  {
    "faostat": 203,
    "m49_code": 724,
    "country_name_en": "Spain",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2015,
    "opening_stocks_tonnes": 28711,
    "production_tonnes": 211084,
    "import_quantity_tonnes": 1616.8,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 4607.42
  },
  {
    "faostat": 203,
    "m49_code": 724,
    "country_name_en": "Spain",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2021,
    "opening_stocks_tonnes": 26208.17,
    "production_tonnes": 365210,
    "import_quantity_tonnes": 31055.82,
    "stock_variation_tonnes": -1164.57,
    "export_quantity_tonnes": 11366.46
  },
  {
    "faostat": 203,
    "m49_code": 724,
    "country_name_en": "Spain",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2014,
    "opening_stocks_tonnes": 28711,
    "production_tonnes": 195704,
    "import_quantity_tonnes": 3631.6,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 1599.51
  },
  {
    "faostat": 203,
    "m49_code": 724,
    "country_name_en": "Spain",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2016,
    "opening_stocks_tonnes": 28711,
    "production_tonnes": 199167,
    "import_quantity_tonnes": 1901.75,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 2013.93
  },
  {
    "faostat": 203,
    "m49_code": 724,
    "country_name_en": "Spain",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2022,
    "opening_stocks_tonnes": 25043.6,
    "production_tonnes": 245990,
    "import_quantity_tonnes": 28881.39,
    "stock_variation_tonnes": -570.6,
    "export_quantity_tonnes": 7973.63
  },
  {
    "faostat": 203,
    "m49_code": 724,
    "country_name_en": "Spain",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2020,
    "opening_stocks_tonnes": 26988.82,
    "production_tonnes": 416950,
    "import_quantity_tonnes": 12585.58,
    "stock_variation_tonnes": -780.65,
    "export_quantity_tonnes": 6771.36
  },
  {
    "faostat": 203,
    "m49_code": 724,
    "country_name_en": "Spain",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2011,
    "opening_stocks_tonnes": "",
    "production_tonnes": 208800,
    "import_quantity_tonnes": 1627,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": 600
  },
  {
    "faostat": 203,
    "m49_code": 724,
    "country_name_en": "Spain",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2019,
    "opening_stocks_tonnes": 26988.82,
    "production_tonnes": 340420,
    "import_quantity_tonnes": 17485.27,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 5497.64
  },
  {
    "faostat": 203,
    "m49_code": 724,
    "country_name_en": "Spain",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2023,
    "opening_stocks_tonnes": 24473,
    "production_tonnes": 297660,
    "import_quantity_tonnes": 15065.82,
    "stock_variation_tonnes": -476.87,
    "export_quantity_tonnes": 3133.76
  },
  {
    "faostat": 203,
    "m49_code": 724,
    "country_name_en": "Spain",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2012,
    "opening_stocks_tonnes": "",
    "production_tonnes": 211700,
    "import_quantity_tonnes": 3734,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": 494
  },
  {
    "faostat": 203,
    "m49_code": 724,
    "country_name_en": "Spain",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2013,
    "opening_stocks_tonnes": "",
    "production_tonnes": 143081,
    "import_quantity_tonnes": 1138,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": 664
  },
  {
    "faostat": 203,
    "m49_code": 724,
    "country_name_en": "Spain",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2017,
    "opening_stocks_tonnes": 28711,
    "production_tonnes": 255503,
    "import_quantity_tonnes": 3355.05,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 2002.78
  },
  {
    "faostat": 203,
    "m49_code": 724,
    "country_name_en": "Spain",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2010,
    "opening_stocks_tonnes": "",
    "production_tonnes": 222518,
    "import_quantity_tonnes": 3019,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": 2100
  }
];


import Datastore from '@seald-io/nedb';

// BD persistente
const db = new Datastore({
  filename: './food-supply-utilization-accounts.db',
  autoload: true
});
const db1 = new Datastore({
  filename: './food-supply-utilization-accounts_v1.db',
  autoload: true
});


export function load_MCS_API_V1(app) {
  const BASE_URL = "/api/v1/food-supply-utilization-accounts";

  // Redirección a documentación (Postman)
  app.get(`${BASE_URL}/docs`, (_req, res) => {
    res.redirect("https://documenter.getpostman.com/view/52349546/2sBXigMDpj");
  });

  // Cargar datos iniciales si la BD está vacía
  app.get(`${BASE_URL}/loadInitialData`, (_req, res) => {
    db1.count({}, (err, count) => {
      if (err) return res.sendStatus(500);
      if (count > 0) return res.sendStatus(409);
      const src = Array.isArray(datamcs) ? datamcs : [];
      const docs = toInsert.map(({ _id, ...doc }) => ({ ...doc })); // sin _id
      if (docs.length === 0) return res.status(200).json({ inserted: 0 });
      db1.insert(docs, (e) => (e ? res.sendStatus(500) : res.status(201).json({ inserted: docs.length })));
    });
  });

  // Helpers
  const toNum = (v) => (v === undefined ? undefined : Number(v));
  const isNum = (v) => typeof v !== 'undefined' && !Number.isNaN(Number(v));
  const ciEq = (v) => new RegExp(`^${String(v).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i');

  // GET colección: filtros por todos los campos + paginación
  app.get(`${BASE_URL}`, (req, res) => {
    const q = {};

    // Campos string exactos (CI)
    if (req.query.country || req.query.country_name_en) q.country_name_en = ciEq(req.query.country || req.query.country_name_en);
    if (req.query.item) q.item = ciEq(req.query.item);

    // faostat / m49_code admiten numérico o CI
    if (req.query.faostat) q.faostat = isNum(req.query.faostat) ? Number(req.query.faostat) : ciEq(req.query.faostat);
    if (req.query.m49_code) q.m49_code = isNum(req.query.m49_code) ? Number(req.query.m49_code) : ciEq(req.query.m49_code);

    // item_code numérico
    if (isNum(req.query.item_code)) q.item_code = Number(req.query.item_code);

    // Campos numéricos exactos
    ["year","opening_stocks_tonnes","production_tonnes","import_quantity_tonnes","stock_variation_tonnes","export_quantity_tonnes"]
      .forEach(f => { if (isNum(req.query[f])) q[f] = Number(req.query[f]); });

    // Rango de años ?from=&to=
    const from = toNum(req.query.from);
    const to = toNum(req.query.to);
    if (isNum(from) || isNum(to)) {
      q.year = {
        ...(q.year || {}),
        ...(isNum(from) ? { $gte: Number(from) } : {}),
        ...(isNum(to) ? { $lte: Number(to) } : {})
      };
    }

    // Paginación
    const offset = Number.parseInt(req.query.offset ?? 0) || 0;
    const limit = Math.min(Number.parseInt(req.query.limit ?? 1000) || 1000, 10000);

    db1.find(q, { _id: 0 }).skip(offset).limit(limit).exec((err, docs) => {
      if (err) return res.sendStatus(500);
      res.status(200).json(docs);
    });
  });

  // GET recurso concreto /:country/:year -> objeto
  app.get(`${BASE_URL}/:country/:year`, (req, res) => {
    const country = req.params.country;
    const year = Number(req.params.year);
    if (Number.isNaN(year)) return res.sendStatus(400);
    db1.findOne({ country_name_en: ciEq(country), year }, { _id: 0 }, (err, doc) => {
      if (err) return res.sendStatus(500);
      if (!doc) return res.sendStatus(404);
      res.status(200).json(doc);
    });
  });

  // GET por país (opcional ?year= o ?from=&to=) -> array
  app.get(`${BASE_URL}/:country`, (req, res) => {
    const country = req.params.country;
    const year = toNum(req.query.year);
    const from = toNum(req.query.from);
    const to = toNum(req.query.to);

    const q = { country_name_en: ciEq(country) };
    if (isNum(year)) q.year = Number(year);
    if (isNum(from) || isNum(to)) {
      q.year = {
        ...(q.year || {}),
        ...(isNum(from) ? { $gte: Number(from) } : {}),
        ...(isNum(to) ? { $lte: Number(to) } : {})
      };
    }

    db1.find(q, { _id: 0 }).exec((err, docs) => {
      if (err) return res.sendStatus(500);
      if (!docs || docs.length === 0) return res.sendStatus(404);
      res.status(200).json(docs);
    });
  });

  // POST colección: crea, valida y evita duplicados (country_name_en, year, item)
  app.post(`${BASE_URL}`, (req, res) => {
    const body = req.body || {};
    const required = [
      "faostat","m49_code","country_name_en","item_code","item","year",
      "opening_stocks_tonnes","production_tonnes","import_quantity_tonnes",
      "stock_variation_tonnes","export_quantity_tonnes"
    ];
    const missing = required.filter(k => !(k in body));
    if (missing.length) return res.status(400).json({ error: "Missing fields", missing });

    db1.findOne(
      { country_name_en: body.country_name_en, year: Number(body.year), item: body.item },
      (err, exists) => {
        if (err) return res.sendStatus(500);
        if (exists) return res.sendStatus(409);
        const doc = { ...body, year: Number(body.year) };
        delete doc._id;
        db1.insert(doc, (e) => (e ? res.sendStatus(500) : res.sendStatus(201)));
      }
    );
  });

  // PUT colección no permitido
  app.put(`${BASE_URL}`, (_req, res) => res.sendStatus(405));

  // POST sobre recurso concreto no permitido
  app.post(`${BASE_URL}/:country`, (_req, res) => res.sendStatus(405));
  app.post(`${BASE_URL}/:country/:year`, (_req, res) => res.sendStatus(405));

  // PUT recurso concreto: sustituye/actualiza
  app.put(`${BASE_URL}/:country/:year`, (req, res) => {
    const country = req.params.country;
    const year = Number(req.params.year);
    const body = req.body || {};
    const required = [
      "faostat","m49_code","country_name_en","item_code","item","year",
      "opening_stocks_tonnes","production_tonnes","import_quantity_tonnes",
      "stock_variation_tonnes","export_quantity_tonnes"
    ];
    const missing = required.filter(k => !(k in body));
    if (Number.isNaN(year) || missing.length) return res.status(400).json({ error: "Bad Request", missing });

    if (String(body.country_name_en).toLowerCase() !== String(country).toLowerCase()) {
      return res.status(400).json({ error: "country_name_en mismatch" });
    }
    if (Number(body.year) !== year) {
      return res.status(400).json({ error: "year mismatch" });
    }

    delete body._id;
    body.year = Number(body.year);

    db1.update({ country_name_en: ciEq(country), year }, { $set: body }, {}, (err, n) => {
      if (err) return res.sendStatus(500);
      if (n === 0) return res.sendStatus(404);
      res.sendStatus(200);
    });
  });

  // DELETE todos
  app.delete(`${BASE_URL}`, (_req, res) => {
    db1.remove({}, { multi: true }, (err, removed) => {
      if (err) return res.sendStatus(500);
      if (removed === 0) return res.sendStatus(404);
      res.sendStatus(200);
    });
  });

  // DELETE por país (todos los registros del país)
  app.delete(`${BASE_URL}/:country`, (req, res) => {
    const country = req.params.country;
    db1.remove({ country_name_en: ciEq(country) }, { multi: true }, (err, removed) => {
      if (err) return res.sendStatus(500);
      if (removed === 0) return res.sendStatus(404);
      res.sendStatus(200);
    });
  });

}

export function load_MCS_API_V2(app) {
  const BASE_URL = "/api/v2/food-supply-utilization-accounts";

  // Redirección a documentación (Postman)
  app.get(`${BASE_URL}/docs`, (_req, res) => {
    res.redirect("https://documenter.getpostman.com/view/52349546/2sBXigMDpj");
  });

  // Cargar datos iniciales si la BD está vacía
  app.get(`${BASE_URL}/loadInitialData`, (_req, res) => {
    db.count({}, (err, count) => {
      if (err) return res.sendStatus(500);
      if (count > 0) return res.sendStatus(409);
      const src = Array.isArray(datamcs) ? datamcs : [];
      const toInsert = src;
      const docs = toInsert.map(({ _id, ...doc }) => ({ ...doc })); // sin _id
      if (docs.length === 0) return res.status(200).json({ inserted: 0 });
      db.insert(docs, (e) => (e ? res.sendStatus(500) : res.status(201).json({ inserted: docs.length })));
    });
  });

  // Helpers
  const toNum = (v) => (v === undefined ? undefined : Number(v));
  const isNum = (v) => typeof v !== 'undefined' && !Number.isNaN(Number(v));
  const ciEq = (v) => new RegExp(`^${String(v).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i');

  // GET colección: filtros por todos los campos + paginación
  app.get(`${BASE_URL}`, (req, res) => {
    const q = {};

    // Campos string exactos (CI)
    if (req.query.country || req.query.country_name_en) q.country_name_en = ciEq(req.query.country || req.query.country_name_en);
    if (req.query.item) q.item = ciEq(req.query.item);

    // faostat / m49_code admiten numérico o CI
    if (req.query.faostat) q.faostat = isNum(req.query.faostat) ? Number(req.query.faostat) : ciEq(req.query.faostat);
    if (req.query.m49_code) q.m49_code = isNum(req.query.m49_code) ? Number(req.query.m49_code) : ciEq(req.query.m49_code);

    // item_code numérico
    if (isNum(req.query.item_code)) q.item_code = Number(req.query.item_code);

    // Campos numéricos exactos
    ["year","opening_stocks_tonnes","production_tonnes","import_quantity_tonnes","stock_variation_tonnes","export_quantity_tonnes"]
      .forEach(f => { if (isNum(req.query[f])) q[f] = Number(req.query[f]); });

    // Rango de años ?from=&to=
    const from = toNum(req.query.from);
    const to = toNum(req.query.to);
    if (isNum(from) || isNum(to)) {
      q.year = {
        ...(q.year || {}),
        ...(isNum(from) ? { $gte: Number(from) } : {}),
        ...(isNum(to) ? { $lte: Number(to) } : {})
      };
    }

    // Paginación
    const offset = Number.parseInt(req.query.offset ?? 0) || 0;
    const limit = Math.min(Number.parseInt(req.query.limit ?? 1000) || 1000, 10000);

    db.find(q, { _id: 0 }).skip(offset).limit(limit).exec((err, docs) => {
      if (err) return res.sendStatus(500);
      res.status(200).json(docs);
    });
  });

  // GET recurso concreto /:country/:year -> objeto
  app.get(`${BASE_URL}/:country/:year`, (req, res) => {
    const country = req.params.country;
    const year = Number(req.params.year);
    if (Number.isNaN(year)) return res.sendStatus(400);
    db.findOne({ country_name_en: ciEq(country), year }, { _id: 0 }, (err, doc) => {
      if (err) return res.sendStatus(500);
      if (!doc) return res.sendStatus(404);
      res.status(200).json(doc);
    });
  });

  // GET por país (opcional ?year= o ?from=&to=) -> array
  app.get(`${BASE_URL}/:country`, (req, res) => {
    const country = req.params.country;
    const year = toNum(req.query.year);
    const from = toNum(req.query.from);
    const to = toNum(req.query.to);

    const q = { country_name_en: ciEq(country) };
    if (isNum(year)) q.year = Number(year);
    if (isNum(from) || isNum(to)) {
      q.year = {
        ...(q.year || {}),
        ...(isNum(from) ? { $gte: Number(from) } : {}),
        ...(isNum(to) ? { $lte: Number(to) } : {})
      };
    }

    db.find(q, { _id: 0 }).exec((err, docs) => {
      if (err) return res.sendStatus(500);
      if (!docs || docs.length === 0) return res.sendStatus(404);
      res.status(200).json(docs);
    });
  });

  // POST colección: crea, valida y evita duplicados (country_name_en, year, item)
  app.post(`${BASE_URL}`, (req, res) => {
    const body = req.body || {};
    const required = [
      "faostat","m49_code","country_name_en","item_code","item","year",
      "opening_stocks_tonnes","production_tonnes","import_quantity_tonnes",
      "stock_variation_tonnes","export_quantity_tonnes"
    ];
    const missing = required.filter(k => !(k in body));
    if (missing.length) return res.status(400).json({ error: "Missing fields", missing });

    db.findOne(
      { country_name_en: body.country_name_en, year: Number(body.year), item: body.item },
      (err, exists) => {
        if (err) return res.sendStatus(500);
        if (exists) return res.sendStatus(409);
        const doc = { ...body, year: Number(body.year) };
        delete doc._id;
        db.insert(doc, (e) => (e ? res.sendStatus(500) : res.sendStatus(201)));
      }
    );
  });

  // PUT colección no permitido
  app.put(`${BASE_URL}`, (_req, res) => res.sendStatus(405));

  // POST sobre recurso concreto no permitido
  app.post(`${BASE_URL}/:country`, (_req, res) => res.sendStatus(405));
  app.post(`${BASE_URL}/:country/:year`, (_req, res) => res.sendStatus(405));

  // PUT recurso concreto: sustituye/actualiza
  app.put(`${BASE_URL}/:country/:year`, (req, res) => {
    const country = req.params.country;
    const year = Number(req.params.year);
    const body = req.body || {};
    const required = [
      "faostat","m49_code","country_name_en","item_code","item","year",
      "opening_stocks_tonnes","production_tonnes","import_quantity_tonnes",
      "stock_variation_tonnes","export_quantity_tonnes"
    ];
    const missing = required.filter(k => !(k in body));
    if (Number.isNaN(year) || missing.length) return res.status(400).json({ error: "Bad Request", missing });

    if (String(body.country_name_en).toLowerCase() !== String(country).toLowerCase()) {
      return res.status(400).json({ error: "country_name_en mismatch" });
    }
    if (Number(body.year) !== year) {
      return res.status(400).json({ error: "year mismatch" });
    }

    delete body._id;
    body.year = Number(body.year);

    db.update({ country_name_en: ciEq(country), year }, { $set: body }, {}, (err, n) => {
      if (err) return res.sendStatus(500);
      if (n === 0) return res.sendStatus(404);
      res.sendStatus(200);
    });
  });

  // DELETE todos
  app.delete(`${BASE_URL}`, (_req, res) => {
    db.remove({}, { multi: true }, (err, removed) => {
      if (err) return res.sendStatus(500);
      if (removed === 0) return res.sendStatus(404);
      res.sendStatus(200);
    });
  });

  // DELETE por país (todos los registros del país)
  
app.delete(`${BASE_URL}/:country`, (req, res) => {
  const country = req.params.country;
  const year = Number(req.query.year);

  const q = { country_name_en: ciEq(country) };
  if (!Number.isNaN(year)) q.year = year;

  db.remove(q, { multi: true }, (err, removed) => {
    if (err) return res.sendStatus(500);
    if (removed === 0) return res.sendStatus(404);
    res.sendStatus(200);
  });
});


}