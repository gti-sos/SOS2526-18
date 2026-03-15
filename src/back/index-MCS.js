import express from "express";

import Datastore from '@seald-io/nedb';
  
const db = new Datastore({ filename: './food-supply-utilization-accounts.db', autoload: true });

export function BackendMCS(app){
  const originalData = datamcs.map((o) => ({ ...o }));
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
  

  // Portal de documentación creados en POSTMAN
    app.get(BASE_URL + "/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/52349546/2sBXigMDpj");
    });
  // -------- NUEVA RUTA: cargar datos iniciales si está vacío --------
  // GET /loadInitialData -> si el array está vacío, carga 10 datos originales
  app.get("/api/v1/food-supply-utilization-accounts/loadInitialData", (req, res) => {
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
  app.get("/api/v1/food-supply-utilization-accounts/", (req, res) => {
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
  app.get("/api/v1/food-supply-utilization-accounts/:country/:year", (req, res) => {
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
  app.get("/api/v1/food-supply-utilization-accounts/:country", (req, res) => {
  const country = (req.params.country || "").toLowerCase();
  const { from, to, year } = req.query;

  // Filtrar por país
  let filtered = datamcs.filter(
    (d) =>
      d.country_name_en &&
      d.country_name_en.toLowerCase() === country
  );

  // Si no hay datos de ese país
  if (filtered.length === 0) {
    return sendJson(res, 404, { error: "Country not found" });
  }

  // -------------------------------------------------------------------
  // 1. FILTRO POR AÑO EXACTO (si se especifica)
  // -------------------------------------------------------------------
  if (typeof year !== "undefined") {
    const y = Number(year);
    if (Number.isNaN(y)) {
      return sendJson(res, 400, { error: "Invalid year" });
    }

    filtered = filtered.filter((d) => Number(d.year) === y);

    if (filtered.length === 0) {
      return sendJson(res, 404, { error: "No data for that year" });
    }

    // Si piden año concreto, devolvemos directamente el array filtrado
    return res.status(200).json(filtered);
  }

  // -------------------------------------------------------------------
  // 2. FILTRO POR RANGO from/to (si se especifican)
  // -------------------------------------------------------------------
  const hasFrom = typeof from !== "undefined";
  const hasTo = typeof to !== "undefined";

  if (hasFrom || hasTo) {
    const f = hasFrom ? Number(from) : Number.NEGATIVE_INFINITY;
    const t = hasTo ? Number(to) : Number.POSITIVE_INFINITY;

    if ((hasFrom && Number.isNaN(f)) || (hasTo && Number.isNaN(t))) {
      return sendJson(res, 400, { error: "Invalid from/to" });
    }

    filtered = filtered.filter((d) => Number(d.year) >= f && Number(d.year) <= t);

    if (filtered.length === 0) {
      return sendJson(res, 404, { error: "No data for that range" });
    }
  }

  // -------------------------------------------------------------------
  // 3. RESPUESTA GENERAL (sin año y sin rango)
  // -------------------------------------------------------------------
  return res.status(200).json(filtered);
});

  /* ===========================
  * POST /  -> crea nuevo registro
  * Validación de campos + conflicto por (country_name_en, year, item)
  * =========================== */
  app.post("/api/v1/food-supply-utilization-accounts/", (req, res) => {
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
  app.post("/api/v1/food-supply-utilization-accounts/:country", (req, res) => {
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
  app.put("/api/v1/food-supply-utilization-accounts/:country/:year", (req, res) => {
    const country = (req.params.country || "").toLowerCase();
    const year = Number(req.params.year);
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
    if (Number.isNaN(year)) return sendJson(res, 400, { error: "Invalid year" });

    const idx = datamcs.findIndex(
      (d) =>
        d.country_name_en &&
        d.country_name_en.toLowerCase() === country &&
        Number(d.year) === year
    );

    if (idx === -1) return sendJson(res, 404, { error: "Resource not found" });

    const body = req.body;
      console.log(body)
      if (body==null){
      res.status(400).send("body empty")
    }else{

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
  }});

  /* ===========================
  * PUT /:country  -> (heredado)
  * Nota: no estaba en el enunciado, se mantiene por compatibilidad.
  * =========================== */
  app.put("/api/v1/food-supply-utilization-accounts/:country", (req, res) => {
    const country = (req.params.country || "").toLowerCase();
    const body = req.body;
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
    if (body==null){
      res.status(400).send("body empty")
    }else
      if (
      typeof body.country_name_en === "string" &&
      body.country_name_en.toLowerCase() !== country
    ) {
      return sendJson(res, 400, {
        error: "Body.country_name_en must match :country in path"
      });
    }{
    const index = datamcs.findIndex(
      (d) => d.country_name_en && d.country_name_en.toLowerCase() === country
    );
    if (index === -1) {
      return sendJson(res, 404, { error: "Country not found" });
    }
    datamcs[index] = body;
    return sendJson(res, 200, { message: "Updated resource for country" });
  }});

  // PUT / -> 405
  app.put("/api/v1/food-supply-utilization-accounts/", (req, res) => {
    res.set("Allow", "GET, POST");
    return sendJson(res, 405, { error: "PUT not allowed on collection" });
  });

  /* ===========================
  * DELETE /:country -> elimina todas las filas del país
  * (No requerido por enunciado, pero ya estaba y se mantiene)
  * =========================== */
  app.delete("/api/v1/food-supply-utilization-accounts/:country", (req, res) => {
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


  app.delete("/api/v1/food-supply-utilization-accounts/", (req, res) => {
    const initialLength = datamcs.length;

    // Elimina todos los registros del array
    datamcs.length = 0;

    if (initialLength === 0) {
      return sendJson(res, 404, { error: "No records found to delete" });
    }

    return sendJson(res, 200, { message: "Deleted all records" });
  });

}
//BackendMCS(app);