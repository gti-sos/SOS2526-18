
// index-MCS.js (ESM)

import express from "express";
const mcsrouter = express.Router();

/* ===========================
 *   Datos
 * =========================== */
// Sustituye esta línea por tu array real:
// const data = [ ... ];
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

export const datamcs = data;

/* ===========================
 *   Funciones auxiliares
 * =========================== */
function avgperCountry(dataset, Country, attribute) {
  const rows = dataset.filter(r => r.country_name_en === Country);
  const values = rows
    .map(r => r[attribute])
    .filter(v => typeof v === "number" && !isNaN(v));

  if (values.length === 0) return null;

  const sum = values.reduce((a, b) => a + b, 0);
  return sum / values.length;
}

export { avgperCountry };

/* ===========================
 *   Rutas API (Router)
 *   Base: /api/v1/food-supply-utilization-accounts
 * =========================== */

// GET / -> lista completa
mcsrouter.get("/", (req, res) => {
  res.status(200).json(datamcs);
});

// GET /:country -> filtra por país (case-insensitive)
mcsrouter.get("/:country", (req, res) => {
  const country = (req.params.country || "").toLowerCase();
  const filtered = datamcs.filter(
    d => d.country_name_en && d.country_name_en.toLowerCase() === country
  );

  if (filtered.length === 0) {
    return res.status(404).json({ error: "Not Found" });
  }
  return res.status(200).json(filtered);
});

// POST / -> crea nuevo registro (con validación + conflicto)
mcsrouter.post("/", (req, res) => {
  const newData = req.body;

  const requiredFields = [
    "faostat",
    "m49_code",
    "country_name_en",
    "item_code",
    "item",
    "year",
    "opening_stocks_tonnes",
    "production_tonnes",
    "import_quantity_tonnes",
    "stock_variation_tonnes",
    "export_quantity_tonnes"
  ];

  const missing = requiredFields.filter(f => !(f in newData));
  if (missing.length > 0) {
    return res
      .status(400)
      .json({ error: "Bad Request", missing_fields: missing });
  }

  const exists = datamcs.some(
    d =>
      d.country_name_en === newData.country_name_en &&
      d.year === newData.year &&
      d.item === newData.item
  );
  if (exists) {
    return res
      .status(409)
      .json({ error: "Conflict: the resource already exists" });
  }

  datamcs.push(newData);
  return res.status(201).json({ message: "Created" });
});


mcsrouter.post("/:country", (req, res) => {
  res.sendStatus(405); // Method Not Allowed
});

// PUT /:country -> reemplaza el primer registro del país por el body
mcsrouter.put("/:country", (req, res) => {
  const country = (req.params.country || "").toLowerCase();
  const body = req.body;

  const index = datamcs.findIndex(
    d => d.country_name_en && d.country_name_en.toLowerCase() === country
  );

  if (index === -1) {
    return res.status(404).json({ error: "Not Found" });
  }

  datamcs[index] = body;
  return res.status(200).json({ message: "Updated" });
});


mcsrouter.put("/", (req, res) => {
  res.sendStatus(405); // Method Not Allowed
});


// DELETE /:country -> elimina todos los registros del país
mcsrouter.delete("/:country", (req, res) => {
  const country = (req.params.country || "").toLowerCase();
  const initialLength = datamcs.length;

  for (let i = datamcs.length - 1; i >= 0; i--) {
    const name = datamcs[i].country_name_en;
    if (name && name.toLowerCase() === country) {
      datamcs.splice(i, 1);
    }
  }

  if (initialLength === datamcs.length) {
    return res.status(404).json({ error: "Not Found" });
  }
  return res.sendStatus(200);
});

// Export por defecto del router
export default mcsrouter;