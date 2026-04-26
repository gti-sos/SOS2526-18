import express from "express";

const datamcs = [
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
    "year": 2015,
    "opening_stocks_tonnes": 9841.14,
    "production_tonnes": 43079.54,
    "import_quantity_tonnes": 4151.48,
    "stock_variation_tonnes": 63.64,
    "export_quantity_tonnes": 23.85
  },
  {
    "faostat": 59,
    "m49_code": 818,
    "country_name_en": "Egypt",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2013,
    "opening_stocks_tonnes": 983.58,
    "production_tonnes": "",
    "import_quantity_tonnes": 1530,
    "stock_variation_tonnes": -690.58,
    "export_quantity_tonnes": 65
  },
  {
    "faostat": 112,
    "m49_code": 400,
    "country_name_en": "Jordan",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2013,
    "opening_stocks_tonnes": 978.13,
    "production_tonnes": 2143,
    "import_quantity_tonnes": 531,
    "stock_variation_tonnes": -450.93,
    "export_quantity_tonnes": 38
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
    "year": 2013,
    "opening_stocks_tonnes": 9744.16,
    "production_tonnes": 43000,
    "import_quantity_tonnes": 6564,
    "stock_variation_tonnes": 168.64,
    "export_quantity_tonnes": 0
  },
  {
    "faostat": 112,
    "m49_code": 400,
    "country_name_en": "Jordan",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2014,
    "opening_stocks_tonnes": 527.2,
    "production_tonnes": 2143,
    "import_quantity_tonnes": 614.53,
    "stock_variation_tonnes": -115.26,
    "export_quantity_tonnes": 11.9
  },
  {
    "faostat": 112,
    "m49_code": 400,
    "country_name_en": "Jordan",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2017,
    "opening_stocks_tonnes": 50.12,
    "production_tonnes": 1801,
    "import_quantity_tonnes": 386.87,
    "stock_variation_tonnes": -50.12,
    "export_quantity_tonnes": 13.3
  },
  {
    "faostat": 59,
    "m49_code": 818,
    "country_name_en": "Egypt",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2023,
    "opening_stocks_tonnes": 470.09,
    "production_tonnes": "",
    "import_quantity_tonnes": 193.97,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 112,
    "m49_code": 400,
    "country_name_en": "Jordan",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2015,
    "opening_stocks_tonnes": 411.94,
    "production_tonnes": 3229,
    "import_quantity_tonnes": 247.29,
    "stock_variation_tonnes": -173.67,
    "export_quantity_tonnes": 25.2
  },
  {
    "faostat": 59,
    "m49_code": 818,
    "country_name_en": "Egypt",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2022,
    "opening_stocks_tonnes": 336.22,
    "production_tonnes": "",
    "import_quantity_tonnes": 676.05,
    "stock_variation_tonnes": 133.87,
    "export_quantity_tonnes": 0
  },
  {
    "faostat": 59,
    "m49_code": 818,
    "country_name_en": "Egypt",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2014,
    "opening_stocks_tonnes": 293,
    "production_tonnes": "",
    "import_quantity_tonnes": 595.96,
    "stock_variation_tonnes": -293,
    "export_quantity_tonnes": 0.2
  },
  {
    "faostat": 59,
    "m49_code": 818,
    "country_name_en": "Egypt",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2021,
    "opening_stocks_tonnes": 290.21,
    "production_tonnes": "",
    "import_quantity_tonnes": 309.81,
    "stock_variation_tonnes": 46.01,
    "export_quantity_tonnes": 0
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
    "year": 2017,
    "opening_stocks_tonnes": 28711,
    "production_tonnes": 255503,
    "import_quantity_tonnes": 3355.05,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 2002.78
  },
  {
    "faostat": 13,
    "m49_code": 48,
    "country_name_en": "Bahrain",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2019,
    "opening_stocks_tonnes": 27.92,
    "production_tonnes": "",
    "import_quantity_tonnes": 45.87,
    "stock_variation_tonnes": -27.92,
    "export_quantity_tonnes": ""
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
    "year": 2019,
    "opening_stocks_tonnes": 26988.82,
    "production_tonnes": 340420,
    "import_quantity_tonnes": 17485.27,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 5497.64
  },
  {
    "faostat": 179,
    "m49_code": 634,
    "country_name_en": "Qatar",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2019,
    "opening_stocks_tonnes": 267.83,
    "production_tonnes": "",
    "import_quantity_tonnes": 100.84,
    "stock_variation_tonnes": -49.28,
    "export_quantity_tonnes": ""
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
    "year": 2023,
    "opening_stocks_tonnes": 24473,
    "production_tonnes": 297660,
    "import_quantity_tonnes": 15065.82,
    "stock_variation_tonnes": -476.87,
    "export_quantity_tonnes": 3133.76
  },
  {
    "faostat": 112,
    "m49_code": 400,
    "country_name_en": "Jordan",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2016,
    "opening_stocks_tonnes": 238.26,
    "production_tonnes": 3498,
    "import_quantity_tonnes": 562.41,
    "stock_variation_tonnes": -188.14,
    "export_quantity_tonnes": 74.51
  },
  {
    "faostat": 112,
    "m49_code": 400,
    "country_name_en": "Jordan",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2010,
    "opening_stocks_tonnes": 2290.52,
    "production_tonnes": 2419,
    "import_quantity_tonnes": 310,
    "stock_variation_tonnes": -57.63,
    "export_quantity_tonnes": 69
  },
  {
    "faostat": 59,
    "m49_code": 818,
    "country_name_en": "Egypt",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2010,
    "opening_stocks_tonnes": 2262.31,
    "production_tonnes": "",
    "import_quantity_tonnes": 1188,
    "stock_variation_tonnes": -648.31,
    "export_quantity_tonnes": 1
  },
  {
    "faostat": 112,
    "m49_code": 400,
    "country_name_en": "Jordan",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2011,
    "opening_stocks_tonnes": 2232.89,
    "production_tonnes": 1893,
    "import_quantity_tonnes": 356,
    "stock_variation_tonnes": -580.96,
    "export_quantity_tonnes": 21
  },
  {
    "faostat": 179,
    "m49_code": 634,
    "country_name_en": "Qatar",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2020,
    "opening_stocks_tonnes": 218.55,
    "production_tonnes": "",
    "import_quantity_tonnes": 55.18,
    "stock_variation_tonnes": -51.9,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 179,
    "m49_code": 634,
    "country_name_en": "Qatar",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2021,
    "opening_stocks_tonnes": 166.66,
    "production_tonnes": "",
    "import_quantity_tonnes": 92.86,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 179,
    "m49_code": 634,
    "country_name_en": "Qatar",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2022,
    "opening_stocks_tonnes": 166.66,
    "production_tonnes": 71,
    "import_quantity_tonnes": 60.49,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 179,
    "m49_code": 634,
    "country_name_en": "Qatar",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2023,
    "opening_stocks_tonnes": 166.66,
    "production_tonnes": 118,
    "import_quantity_tonnes": 47.4,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 112,
    "m49_code": 400,
    "country_name_en": "Jordan",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2012,
    "opening_stocks_tonnes": 1651.93,
    "production_tonnes": 1902,
    "import_quantity_tonnes": 366,
    "stock_variation_tonnes": -673.8,
    "export_quantity_tonnes": 6
  },
  {
    "faostat": 59,
    "m49_code": 818,
    "country_name_en": "Egypt",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2011,
    "opening_stocks_tonnes": 1614,
    "production_tonnes": "",
    "import_quantity_tonnes": 977,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 185
  },
  {
    "faostat": 59,
    "m49_code": 818,
    "country_name_en": "Egypt",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2012,
    "opening_stocks_tonnes": 1614,
    "production_tonnes": "",
    "import_quantity_tonnes": 828,
    "stock_variation_tonnes": -630.42,
    "export_quantity_tonnes": 21
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
    "year": 2018,
    "opening_stocks_tonnes": 10077.64,
    "production_tonnes": 43000,
    "import_quantity_tonnes": 15643.13,
    "stock_variation_tonnes": 595.63,
    "export_quantity_tonnes": 201.71
  },
  {
    "faostat": 219,
    "m49_code": 776,
    "country_name_en": "Tonga",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2022,
    "opening_stocks_tonnes": 0.06,
    "production_tonnes": "",
    "import_quantity_tonnes": 0.02,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 219,
    "m49_code": 776,
    "country_name_en": "Tonga",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2023,
    "opening_stocks_tonnes": 0.06,
    "production_tonnes": "",
    "import_quantity_tonnes": 0.02,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 148,
    "m49_code": 520,
    "country_name_en": "Nauru",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2020,
    "opening_stocks_tonnes": 0.03,
    "production_tonnes": "",
    "import_quantity_tonnes": 0,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 148,
    "m49_code": 520,
    "country_name_en": "Nauru",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2021,
    "opening_stocks_tonnes": 0.03,
    "production_tonnes": "",
    "import_quantity_tonnes": 0,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 148,
    "m49_code": 520,
    "country_name_en": "Nauru",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2022,
    "opening_stocks_tonnes": 0.02,
    "production_tonnes": "",
    "import_quantity_tonnes": 0.01,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 148,
    "m49_code": 520,
    "country_name_en": "Nauru",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2023,
    "opening_stocks_tonnes": 0.02,
    "production_tonnes": "",
    "import_quantity_tonnes": 0.01,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 127,
    "m49_code": 584,
    "country_name_en": "Marshall Islands",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2019,
    "opening_stocks_tonnes": 0,
    "production_tonnes": "",
    "import_quantity_tonnes": 0.17,
    "stock_variation_tonnes": 0.07,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 219,
    "m49_code": 776,
    "country_name_en": "Tonga",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2020,
    "opening_stocks_tonnes": 0,
    "production_tonnes": "",
    "import_quantity_tonnes": 0.06,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 13,
    "m49_code": 48,
    "country_name_en": "Bahrain",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2023,
    "opening_stocks_tonnes": 0,
    "production_tonnes": "",
    "import_quantity_tonnes": 59.84,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 13,
    "m49_code": 48,
    "country_name_en": "Bahrain",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2021,
    "opening_stocks_tonnes": 0,
    "production_tonnes": "",
    "import_quantity_tonnes": 54.84,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 0.01
  },
  {
    "faostat": 13,
    "m49_code": 48,
    "country_name_en": "Bahrain",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2022,
    "opening_stocks_tonnes": 0,
    "production_tonnes": "",
    "import_quantity_tonnes": 56.23,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 0.04
  },
  {
    "faostat": 127,
    "m49_code": 584,
    "country_name_en": "Marshall Islands",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2023,
    "opening_stocks_tonnes": 0,
    "production_tonnes": "",
    "import_quantity_tonnes": 0.04,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 148,
    "m49_code": 520,
    "country_name_en": "Nauru",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2019,
    "opening_stocks_tonnes": 0,
    "production_tonnes": "",
    "import_quantity_tonnes": 0.04,
    "stock_variation_tonnes": 0.02,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 127,
    "m49_code": 584,
    "country_name_en": "Marshall Islands",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2021,
    "opening_stocks_tonnes": 0,
    "production_tonnes": "",
    "import_quantity_tonnes": 0.08,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 10.78
  },
  {
    "faostat": 219,
    "m49_code": 776,
    "country_name_en": "Tonga",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2021,
    "opening_stocks_tonnes": 0,
    "production_tonnes": "",
    "import_quantity_tonnes": 0.1,
    "stock_variation_tonnes": 0.05,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 127,
    "m49_code": 584,
    "country_name_en": "Marshall Islands",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2020,
    "opening_stocks_tonnes": 0,
    "production_tonnes": "",
    "import_quantity_tonnes": 0.19,
    "stock_variation_tonnes": 0.08,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 13,
    "m49_code": 48,
    "country_name_en": "Bahrain",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2020,
    "opening_stocks_tonnes": 0,
    "production_tonnes": "",
    "import_quantity_tonnes": 46.71,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 0
  },
  {
    "faostat": 219,
    "m49_code": 776,
    "country_name_en": "Tonga",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2019,
    "opening_stocks_tonnes": 0,
    "production_tonnes": "",
    "import_quantity_tonnes": 0.01,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 127,
    "m49_code": 584,
    "country_name_en": "Marshall Islands",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2022,
    "opening_stocks_tonnes": 0,
    "production_tonnes": "",
    "import_quantity_tonnes": 0.15,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 112,
    "m49_code": 400,
    "country_name_en": "Jordan",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2020,
    "opening_stocks_tonnes": 0,
    "production_tonnes": 1403,
    "import_quantity_tonnes": 467.14,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 54.45
  },
  {
    "faostat": 112,
    "m49_code": 400,
    "country_name_en": "Jordan",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2022,
    "opening_stocks_tonnes": 0,
    "production_tonnes": 1848.2,
    "import_quantity_tonnes": 300.61,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 95.66
  },
  {
    "faostat": 112,
    "m49_code": 400,
    "country_name_en": "Jordan",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2023,
    "opening_stocks_tonnes": 0,
    "production_tonnes": 2651.8,
    "import_quantity_tonnes": 325.37,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 103.6
  },
  {
    "faostat": 112,
    "m49_code": 400,
    "country_name_en": "Jordan",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2019,
    "opening_stocks_tonnes": 0,
    "production_tonnes": 1409,
    "import_quantity_tonnes": 411.65,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 72.67
  },
  {
    "faostat": 112,
    "m49_code": 400,
    "country_name_en": "Jordan",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2021,
    "opening_stocks_tonnes": 0,
    "production_tonnes": 1535,
    "import_quantity_tonnes": 368.12,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 91.85
  },
  {
    "faostat": 112,
    "m49_code": 400,
    "country_name_en": "Jordan",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2018,
    "opening_stocks_tonnes": 0,
    "production_tonnes": 1685,
    "import_quantity_tonnes": 395.44,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 59.85
  },
  {
    "faostat": 59,
    "m49_code": 818,
    "country_name_en": "Egypt",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2018,
    "opening_stocks_tonnes": 0,
    "production_tonnes": "",
    "import_quantity_tonnes": 111.69,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 38.18
  },
  {
    "faostat": 59,
    "m49_code": 818,
    "country_name_en": "Egypt",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2019,
    "opening_stocks_tonnes": 0,
    "production_tonnes": "",
    "import_quantity_tonnes": 590.61,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 59,
    "m49_code": 818,
    "country_name_en": "Egypt",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2020,
    "opening_stocks_tonnes": 0,
    "production_tonnes": "",
    "import_quantity_tonnes": 651.38,
    "stock_variation_tonnes": 290.21,
    "export_quantity_tonnes": 0
  },
  {
    "faostat": 59,
    "m49_code": 818,
    "country_name_en": "Egypt",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2017,
    "opening_stocks_tonnes": 0,
    "production_tonnes": "",
    "import_quantity_tonnes": 73.12,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 28.74
  },
  {
    "faostat": 59,
    "m49_code": 818,
    "country_name_en": "Egypt",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2016,
    "opening_stocks_tonnes": 0,
    "production_tonnes": "",
    "import_quantity_tonnes": 585.56,
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": 0.03
  },
  {
    "faostat": 59,
    "m49_code": 818,
    "country_name_en": "Egypt",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2015,
    "opening_stocks_tonnes": 0,
    "production_tonnes": "",
    "import_quantity_tonnes": "",
    "stock_variation_tonnes": 0,
    "export_quantity_tonnes": ""
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
    "year": 2010,
    "opening_stocks_tonnes": 9664.04,
    "production_tonnes": 38000,
    "import_quantity_tonnes": 4653,
    "stock_variation_tonnes": 102.66,
    "export_quantity_tonnes": 138
  },
  {
    "faostat": 168,
    "m49_code": 598,
    "country_name_en": "Papua New Guinea",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2020,
    "opening_stocks_tonnes": "",
    "production_tonnes": "",
    "import_quantity_tonnes": 0.03,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 90,
    "m49_code": 324,
    "country_name_en": "Guinea",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2022,
    "opening_stocks_tonnes": "",
    "production_tonnes": "",
    "import_quantity_tonnes": 0.15,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 93,
    "m49_code": 332,
    "country_name_en": "Haiti",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2016,
    "opening_stocks_tonnes": "",
    "production_tonnes": "",
    "import_quantity_tonnes": "",
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 18,
    "m49_code": 64,
    "country_name_en": "Bhutan",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2022,
    "opening_stocks_tonnes": "",
    "production_tonnes": "",
    "import_quantity_tonnes": 1.73,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 122,
    "m49_code": 426,
    "country_name_en": "Lesotho",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2014,
    "opening_stocks_tonnes": "",
    "production_tonnes": "",
    "import_quantity_tonnes": "04.07",
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 7,
    "m49_code": 24,
    "country_name_en": "Angola",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2014,
    "opening_stocks_tonnes": "",
    "production_tonnes": "",
    "import_quantity_tonnes": 5.91,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 168,
    "m49_code": 598,
    "country_name_en": "Papua New Guinea",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2016,
    "opening_stocks_tonnes": "",
    "production_tonnes": "",
    "import_quantity_tonnes": 1.25,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 93,
    "m49_code": 332,
    "country_name_en": "Haiti",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2017,
    "opening_stocks_tonnes": "",
    "production_tonnes": "",
    "import_quantity_tonnes": 0.01,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 197,
    "m49_code": 694,
    "country_name_en": "Sierra Leone",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2017,
    "opening_stocks_tonnes": "",
    "production_tonnes": "",
    "import_quantity_tonnes": 0.02,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 196,
    "m49_code": 690,
    "country_name_en": "Seychelles",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2019,
    "opening_stocks_tonnes": "",
    "production_tonnes": "",
    "import_quantity_tonnes": 5.72,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 56,
    "m49_code": 214,
    "country_name_en": "Dominican Republic",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2019,
    "opening_stocks_tonnes": "",
    "production_tonnes": "",
    "import_quantity_tonnes": 127.15,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": 1.42
  },
  {
    "faostat": 193,
    "m49_code": 678,
    "country_name_en": "Sao Tome and Principe",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2023,
    "opening_stocks_tonnes": "",
    "production_tonnes": "",
    "import_quantity_tonnes": 0.24,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 176,
    "m49_code": 626,
    "country_name_en": "Timor-Leste",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2015,
    "opening_stocks_tonnes": "",
    "production_tonnes": "",
    "import_quantity_tonnes": 0.68,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 123,
    "m49_code": 430,
    "country_name_en": "Liberia",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2019,
    "opening_stocks_tonnes": "",
    "production_tonnes": "",
    "import_quantity_tonnes": 0.1,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 155,
    "m49_code": 548,
    "country_name_en": "Vanuatu",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2019,
    "opening_stocks_tonnes": "",
    "production_tonnes": "",
    "import_quantity_tonnes": 0.05,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 83,
    "m49_code": 296,
    "country_name_en": "Kiribati",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2023,
    "opening_stocks_tonnes": "",
    "production_tonnes": "",
    "import_quantity_tonnes": 0.01,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 155,
    "m49_code": 548,
    "country_name_en": "Vanuatu",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2020,
    "opening_stocks_tonnes": "",
    "production_tonnes": "",
    "import_quantity_tonnes": 0.04,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 7,
    "m49_code": 24,
    "country_name_en": "Angola",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2022,
    "opening_stocks_tonnes": "",
    "production_tonnes": "",
    "import_quantity_tonnes": 6.82,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": 0.14
  },
  {
    "faostat": 93,
    "m49_code": 332,
    "country_name_en": "Haiti",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2014,
    "opening_stocks_tonnes": "",
    "production_tonnes": "",
    "import_quantity_tonnes": 0.03,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 168,
    "m49_code": 598,
    "country_name_en": "Papua New Guinea",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2015,
    "opening_stocks_tonnes": "",
    "production_tonnes": "",
    "import_quantity_tonnes": 0.36,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": ""
  },
  {
    "faostat": 56,
    "m49_code": 214,
    "country_name_en": "Dominican Republic",
    "item_code": 221,
    "item": "Almonds, in shell",
    "year": 2022,
    "opening_stocks_tonnes": "",
    "production_tonnes": "",
    "import_quantity_tonnes": 132.34,
    "stock_variation_tonnes": "",
    "export_quantity_tonnes": ""
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