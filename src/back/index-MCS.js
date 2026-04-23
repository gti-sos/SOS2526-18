import express from "express";

const datamcs = [
  {
  faostat: 203,
  m49_code: 724,
  country_name_en: "Spain",
  item_code: 221,
  item: "Almonds, in shell",
  year: 2010,
  opening_stocks_tonnes: null,
  production_tonnes: 222518.0,
  import_quantity_tonnes: 3019.0,
  stock_variation_tonnes: null,
  export_quantity_tonnes: 2100.0
},
{
  faostat: 203,
  m49_code: 724,
  country_name_en: "Spain",
  item_code: 221,
  item: "Almonds, in shell",
  year: 2011,
  opening_stocks_tonnes: null,
  production_tonnes: 208800.0,
  import_quantity_tonnes: 1627.0,
  stock_variation_tonnes: null,
  export_quantity_tonnes: 600.0
},
{
  faostat: 203,
  m49_code: 724,
  country_name_en: "Spain",
  item_code: 221,
  item: "Almonds, in shell",
  year: 2012,
  opening_stocks_tonnes: null,
  production_tonnes: 211700.0,
  import_quantity_tonnes: 3734.0,
  stock_variation_tonnes: null,
  export_quantity_tonnes: 494.0
},
{
  faostat: 203,
  m49_code: 724,
  country_name_en: "Spain",
  item_code: 221,
  item: "Almonds, in shell",
  year: 2013,
  opening_stocks_tonnes: null,
  production_tonnes: 143081.0,
  import_quantity_tonnes: 1138.0,
  stock_variation_tonnes: null,
  export_quantity_tonnes: 664.0
},
{
  faostat: 203,
  m49_code: 724,
  country_name_en: "Spain",
  item_code: 221,
  item: "Almonds, in shell",
  year: 2014,
  opening_stocks_tonnes: 28711.0,
  production_tonnes: 195704.0,
  import_quantity_tonnes: 3631.6,
  stock_variation_tonnes: 0.0,
  export_quantity_tonnes: 1599.51
},
{
  faostat: 203,
  m49_code: 724,
  country_name_en: "Spain",
  item_code: 221,
  item: "Almonds, in shell",
  year: 2015,
  opening_stocks_tonnes: 28711.0,
  production_tonnes: 211084.0,
  import_quantity_tonnes: 1616.8,
  stock_variation_tonnes: 0.0,
  export_quantity_tonnes: 4607.42
},
{
  faostat: 203,
  m49_code: 724,
  country_name_en: "Spain",
  item_code: 221,
  item: "Almonds, in shell",
  year: 2016,
  opening_stocks_tonnes: 28711.0,
  production_tonnes: 199167.0,
  import_quantity_tonnes: 1901.75,
  stock_variation_tonnes: 0.0,
  export_quantity_tonnes: 2013.93
},
{
  faostat: 203,
  m49_code: 724,
  country_name_en: "Spain",
  item_code: 221,
  item: "Almonds, in shell",
  year: 2017,
  opening_stocks_tonnes: 28711.0,
  production_tonnes: 255503.0,
  import_quantity_tonnes: 3355.05,
  stock_variation_tonnes: 0.0,
  export_quantity_tonnes: 2002.78
},
{
  faostat: 203,
  m49_code: 724,
  country_name_en: "Spain",
  item_code: 221,
  item: "Almonds, in shell",
  year: 2018,
  opening_stocks_tonnes: 28711.0,
  production_tonnes: 339033.0,
  import_quantity_tonnes: 2348.59,
  stock_variation_tonnes: -1722.18,
  export_quantity_tonnes: 4868.58
},
{
  faostat: 203,
  m49_code: 724,
  country_name_en: "Spain",
  item_code: 221,
  item: "Almonds, in shell",
  year: 2019,
  opening_stocks_tonnes: 26988.82,
  production_tonnes: 340420.0,
  import_quantity_tonnes: 17485.27,
  stock_variation_tonnes: 0.0,
  export_quantity_tonnes: 5497.64
},
{
  faostat: 203,
  m49_code: 724,
  country_name_en: "Spain",
  item_code: 221,
  item: "Almonds, in shell",
  year: 2020,
  opening_stocks_tonnes: 26988.82,
  production_tonnes: 416950.0,
  import_quantity_tonnes: 12585.58,
  stock_variation_tonnes: -780.65,
  export_quantity_tonnes: 6771.36
},
{
  faostat: 203,
  m49_code: 724,
  country_name_en: "Spain",
  item_code: 221,
  item: "Almonds, in shell",
  year: 2021,
  opening_stocks_tonnes: 26208.17,
  production_tonnes: 365210.0,
  import_quantity_tonnes: 31055.82,
  stock_variation_tonnes: -1164.57,
  export_quantity_tonnes: 11366.46
},
{
  faostat: 203,
  m49_code: 724,
  country_name_en: "Spain",
  item_code: 221,
  item: "Almonds, in shell",
  year: 2022,
  opening_stocks_tonnes: 25043.6,
  production_tonnes: 245990.0,
  import_quantity_tonnes: 28881.39,
  stock_variation_tonnes: -570.6,
  export_quantity_tonnes: 7973.63
},
{
  faostat: 203,
  m49_code: 724,
  country_name_en: "Spain",
  item_code: 221,
  item: "Almonds, in shell",
  year: 2023,
  opening_stocks_tonnes: 24473.0,
  production_tonnes: 297660.0,
  import_quantity_tonnes: 15065.82,
  stock_variation_tonnes: -476.87,
  export_quantity_tonnes: 3133.76
}
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

// ⚠️ Se asume que existe: const datamcs = [ { ... }, ... ];

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
      const toInsert = src.length >= 10 ? src.slice(0, 10) : src;
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
      const toInsert = src.length >= 10 ? src.slice(0, 10) : src;
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