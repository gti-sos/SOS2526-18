


import express from "express";
const mcsrouter = express.Router();

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


// Copia inmutable de los datos originales para poder recargarlos cuando esté vacío
const originalData = data.map((o) => ({ ...o }));
export const datamcs = data;

/* ===========================
 * Utilidades de respuesta
 * =========================== */
const STATUS_TEXT = {
  200: "Ok",
  201: "Created",
  400: "Bad Request",
  404: "Not Found",
  405: "Method Not Allowed",
  409: "Conflict"
};

function sendJson(res, code, extra = {}) {
  return res.status(code).json({
    status: code,
    message: STATUS_TEXT[code] || "Status",
    ...extra
  });
}

/* ===========================
 * Funciones auxiliares
 * =========================== */
function avgperCountry(dataset, Country, attribute) {
  const rows = dataset.filter((r) => r.country_name_en === Country);
  const values = rows
    .map((r) => r[attribute])
    .filter((v) => typeof v === "number" && !isNaN(v));
  if (values.length === 0) return null;
  const sum = values.reduce((a, b) => a + b, 0);
  return sum / values.length;
}
export { avgperCountry };

/* ===========================
 * Rutas API (Router)
 * Base: /api/v1/food-supply-utilization-accounts
 * =========================== */

// -------- NUEVA RUTA: cargar datos iniciales si está vacío --------
// GET /loadInitialData -> si el array está vacío, carga 10 datos originales
mcsrouter.get("/loadInitialData", (req, res) => {
  if (datamcs.length > 0) {
    return res.status(200).json({
      status: 200,
      message: "Ok",
      info: "El dataset ya estaba inicializado; no se han insertado datos.",
      current_length: datamcs.length
    });
  }
  // Insertamos los 10 primeros del snapshot original
  const seed = originalData.slice(0, 10);
  datamcs.push(...seed);
  return res.status(200).json({
    status: 200,
    message: "Ok",
    info: "Datos iniciales cargados correctamente.",
    inserted: seed.length,
    current_length: datamcs.length
  });
});

// Salud/diagnóstico rápido (200)
mcsrouter.get("/health", (req, res) => {
  return sendJson(res, 200, { data_count: datamcs.length });
});

/* ===========================
 * GET /   (colección)
 * Soporta:
 *   - ?country=...           -> filtra por país
 *   - ?year=YYYY             -> filtra por año
 *   - ?from=YYYY&to=YYYY     -> rango global (todos los países)
 * Combinaciones:
 *   - ?country=...&year=YYYY
 *   - ?country=...&from=YYYY&to=YYYY
 * Si la búsqueda no tiene resultados -> [] (200)
 * =========================== */
mcsrouter.get("/", (req, res) => {
  const { country, year, from, to } = req.query;
  let result = [...datamcs];

  // Filtrado por país (query)
  if (typeof country === "string" && country.trim() !== "") {
    const c = country.toLowerCase();
    result = result.filter(
      (d) => d.country_name_en && d.country_name_en.toLowerCase() === c
    );
  }

  // Filtrado por año concreto
  if (typeof year !== "undefined") {
    const y = Number(year);
    if (Number.isNaN(y)) return sendJson(res, 400, { error: "Invalid year" });
    result = result.filter((d) => Number(d.year) === y);
  }

  // Filtrado por rango (from / to), global o combinado con país
  const hasFrom = typeof from !== "undefined";
  const hasTo = typeof to !== "undefined";
  if (hasFrom || hasTo) {
    const f = hasFrom ? Number(from) : Number.NEGATIVE_INFINITY;
    const t = hasTo ? Number(to) : Number.POSITIVE_INFINITY;
    if ((hasFrom && Number.isNaN(f)) || (hasTo && Number.isNaN(t))) {
      return sendJson(res, 400, { error: "Invalid from/to" });
    }
    result = result.filter((d) => Number(d.year) >= f && Number(d.year) <= t);
  }

  // Siempre devolver array (aunque esté vacío)
  return res.status(200).json(result);
});

/* ===========================
 * GET /:country/:year  -> registro concreto (objeto)
 * Si no existe -> 404
 * Nota: si hay múltiples items para ese país+año, se devuelve el primero.
 * =========================== */
mcsrouter.get("/:country/:year", (req, res) => {
  const country = (req.params.country || "").toLowerCase();
  const year = Number(req.params.year);
  if (Number.isNaN(year)) return sendJson(res, 400, { error: "Invalid year" });

  const row = datamcs.find(
    (d) =>
      d.country_name_en &&
      d.country_name_en.toLowerCase() === country &&
      Number(d.year) === year
  );
  if (!row) return sendJson(res, 404, { error: "Resource not found" });

  // Devolver objeto plano (no sobre la envoltura sendJson para respetar el enunciado)
  return res.status(200).json(row);
});

/* ===========================
 * GET /:country  -> lista por país
 * Soporta también ?from&to para rango del país
 * Si no hay resultados -> [] (200)
 * =========================== */
mcsrouter.get("/:country", (req, res) => {
  const country = (req.params.country || "").toLowerCase();
  const { from, to } = req.query;

  let filtered = datamcs.filter(
    (d) => d.country_name_en && d.country_name_en.toLowerCase() === country
  );

  // Rango opcional para ese país
  const hasFrom = typeof from !== "undefined";
  const hasTo = typeof to !== "undefined";
  if (hasFrom || hasTo) {
    const f = hasFrom ? Number(from) : Number.NEGATIVE_INFINITY;
    const t = hasTo ? Number(to) : Number.POSITIVE_INFINITY;
    if ((hasFrom && Number.isNaN(f)) || (hasTo && Number.isNaN(t))) {
      return sendJson(res, 400, { error: "Invalid from/to" });
    }
    filtered = filtered.filter((d) => Number(d.year) >= f && Number(d.year) <= t);
  }

  // Siempre array (aunque vacío)
  return res.status(200).json(filtered);
});

/* ===========================
 * POST /  -> crea nuevo registro
 * Validación de campos + conflicto por (country_name_en, year, item)
 * =========================== */
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

  const missing = requiredFields.filter((f) => !(f in newData));
  if (missing.length > 0) {
    return sendJson(res, 400, { missing_fields: missing });
  }

  const exists = datamcs.some(
    (d) =>
      d.country_name_en === newData.country_name_en &&
      d.year === newData.year &&
      d.item === newData.item
  );
  if (exists) {
    return sendJson(res, 409, {
      error: "The resource already exists (country_name_en, year, item)"
    });
  }

  datamcs.push(newData);
  return sendJson(res, 201, {
    location: `/${encodeURIComponent(newData.country_name_en)}`
  });
});

// POST /:country -> 405
mcsrouter.post("/:country", (req, res) => {
  res.set("Allow", "GET, PUT, DELETE");
  return sendJson(res, 405, { error: "POST not allowed on /:country" });
});

/* ===========================
 * PUT /:country/:year  -> actualiza un registro concreto
 * Reglas:
 *   - year de la ruta debe ser número válido
 *   - si body incluye country_name_en, debe coincidir (case-insensitive)
 *   - si body incluye year, debe coincidir con el de la ruta
 *   - si hay varios items para país+año, se actualiza el primero (ver nota)
 * =========================== */
mcsrouter.put("/:country/:year", (req, res) => {
  const country = (req.params.country || "").toLowerCase();
  const year = Number(req.params.year);
  if (Number.isNaN(year)) return sendJson(res, 400, { error: "Invalid year" });

  const idx = datamcs.findIndex(
    (d) =>
      d.country_name_en &&
      d.country_name_en.toLowerCase() === country &&
      Number(d.year) === year
  );

  if (idx === -1) return sendJson(res, 404, { error: "Resource not found" });

  const body = req.body || {};

  // Validaciones de coherencia con la ruta
  if (
    typeof body.country_name_en === "string" &&
    body.country_name_en.toLowerCase() !== country
  ) {
    return sendJson(res, 400, {
      error: "Body.country_name_en must match :country in path"
    });
  }
  if (typeof body.year !== "undefined" && Number(body.year) !== year) {
    return sendJson(res, 400, { error: "Body.year must match :year in path" });
  }

  datamcs[idx] = { ...datamcs[idx], ...body };
  return sendJson(res, 200, { message: "Updated resource for country/year" });
});

/* ===========================
 * PUT /:country  -> (heredado)
 * Nota: no estaba en el enunciado, se mantiene por compatibilidad.
 * =========================== */
mcsrouter.put("/:country", (req, res) => {
  const country = (req.params.country || "").toLowerCase();
  const body = req.body;
  const index = datamcs.findIndex(
    (d) => d.country_name_en && d.country_name_en.toLowerCase() === country
  );
  if (index === -1) {
    return sendJson(res, 404, { error: "Country not found" });
  }
  datamcs[index] = body;
  return sendJson(res, 200, { message: "Updated resource for country" });
});

// PUT / -> 405
mcsrouter.put("/", (req, res) => {
  res.set("Allow", "GET, POST");
  return sendJson(res, 405, { error: "PUT not allowed on collection" });
});

/* ===========================
 * DELETE /:country -> elimina todas las filas del país
 * (No requerido por enunciado, pero ya estaba y se mantiene)
 * =========================== */
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
    return sendJson(res, 404, { error: "Country not found" });
    }
  return sendJson(res, 200, { message: "Deleted all records for country" });
});

// Export por defecto del router
export default mcsrouter;