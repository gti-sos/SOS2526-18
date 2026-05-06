
//Inicialización del array 
let initialData = [
    { country: "Afghanistan", country_code: "AFG", year: 1961, land_used: 3313500, cereal_production: 3695000, cereal_yield: 1.11, population: 9214082 },
    { country: "Afghanistan", country_code: "AFG", year: 1962, land_used: 3425500, cereal_production: 3696000, cereal_yield: 1.07, population: 9440441 },
    { country: "Afghanistan", country_code: "AFG", year: 1963, land_used: 3426500, cereal_production: 3378000, cereal_yield: 0.98, population: 9644910 },
    { country: "Mauritania", country_code: "MRT", year: 1961, land_used: 246050, cereal_production: 91000, cereal_yield: 0.36, population: 884617 },
    { country: "Mauritania", country_code: "MRT", year: 1962, land_used: 246050, cereal_production: 93200, cereal_yield: 0.37, population: 886919 },
    { country: "Mauritania", country_code: "MRT", year: 1963, land_used: 252600, cereal_production: 94595, cereal_yield: 0.37, population: 934255 },
    { country: "Oman", country_code: "OMN", year: 2020, land_used: 13836, cereal_production: 212258, cereal_yield: 15.34, population: 4522502 },
    { country: "Oman", country_code: "OMN", year: 2021, land_used: 5628, cereal_production: 14621, cereal_yield: 2.59, population: 4500429 },
    { country: "Oman", country_code: "OMN", year: 2022, land_used: 6721, cereal_production: 23629, cereal_yield: 3.51, population: 4573022 },
    { country: "Oman", country_code: "OMN", year: 2023, land_used: 7724, cereal_production: 22513, cereal_yield: 2.91, population: 4504926 },
    { country: "Paraguay", country_code: "PRY", year: 2001, land_used: 753625, cereal_production: 1628020, cereal_yield: 2.16, population: 5187690 },
    { country: "Paraguay", country_code: "PRY", year: 2002, land_used: 740979, cereal_production: 1548965, cereal_yield: 2.09, population: 5261334 },
    { country: "Paraguay", country_code: "PRY", year: 2003, land_used: 821259, cereal_production: 1908170, cereal_yield: 2.32, population: 5326437 },
    { country: "Paraguay", country_code: "PRY", year: 2004, land_used: 803935, cereal_production: 1979103, cereal_yield: 2.46, population: 5388181 },
    { country: "Paraguay", country_code: "PRY", year: 2005, land_used: 806850, cereal_production: 1749200, cereal_yield: 2.16, population: 5448100 },
    { country: "Spain", country_code: "ESP", year: 2017, land_used: 6011747, cereal_production: 16653669, cereal_yield: 27.702, population: 46868594 },
    { country: "Spain", country_code: "ESP", year: 2018, land_used: 6027610, cereal_production: 25348920, cereal_yield: 42.055, population: 47092817 },
    { country: "Spain", country_code: "ESP", year: 2019, land_used: 5975710, cereal_production: 20589030, cereal_yield: 34455.001, population: 47435121 },
    { country: "Spain", country_code: "ESP", year: 2020, land_used: 6069230, cereal_production: 27320900, cereal_yield: 45.015, population: 47679482 },
    { country: "Spain", country_code: "ESP", year: 2023, land_used: 6011747, cereal_production: 19495949, cereal_yield: 27.702, population: 46868594 },
    { country: "Spain", country_code: "ESP", year: 2025, land_used: 5345678, cereal_production: 20456788, cereal_yield: 34455.001, population: 47435121 },
    { country: "Spain", country_code: "ESP", year: 2022, land_used: 6378456, cereal_production: 27325678, cereal_yield: 45.015, population: 47679482 },
    { country: "Spain", country_code: "ESP", year: 2021, land_used: 6057689, cereal_production: 25510560, cereal_yield: 42274.003, population: 47735670 },
    { country: "China", country_code: "CHN", year: 1961, land_used: 89467590, cereal_production: 107000000, cereal_yield: 11.927, population: 655773484 },
    { country: "Russia", country_code: "RUS", year: 1995, land_used: 49309960, cereal_production: 61901840, cereal_yield: 12.554001, population: 148291406 },
    { country: "France", country_code: "FRA", year: 1970, land_used: 9318100, cereal_production: 31443420, cereal_yield: 33.744001, population: 50813071 },
    { country: "Afghanistan", country_code: "AFG", year: 1990, land_used: 2253000, cereal_production: 2705000, cereal_yield: 12.006, population: 12045664},
    { country: "Afghanistan", country_code: "AFG", year: 1991, land_used: 2345071, cereal_production: 2721302.2, cereal_yield: 11.604, population: 12238879},
    { country: "Afghanistan", country_code: "AFG", year: 1992, land_used: 2250000, cereal_production: 2470000, cereal_yield: 10.978, population: 13278983},
    { country: "Afghanistan", country_code: "AFG", year: 1993, land_used: 2631882, cereal_production: 2981774, cereal_yield: 11.329, population: 14943175},
    { country: "Afghanistan", country_code: "AFG", year: 1994, land_used: 2757000, cereal_production: 3144000, cereal_yield: 11.404, population: 16250800},
    { country: "Afghanistan", country_code: "AFG", year: 1995, land_used: 2669450, cereal_production: 3242179.2, cereal_yield: 12.145, population: 17065837},
    { country: "Afghanistan", country_code: "AFG", year: 1996, land_used: 2691670, cereal_production: 3241914.8, cereal_yield: 12.044, population: 17763266},
    { country: "Afghanistan", country_code: "AFG", year: 1997, land_used: 2730401, cereal_production: 3682722.5, cereal_yield: 13.488, population: 18452100},
    { country: "Afghanistan", country_code: "AFG", year: 1998, land_used: 2792105, cereal_production: 3875506, cereal_yield: 1.388, population: 19159996}, 
    { country: "Afghanistan", country_code: "AFG", year: 1999, land_used: 2532871, cereal_production: 3256395.8, cereal_yield: 12.857, population: 19887792},
    { country: "Germany", country_code: "DEU", year: 2022, land_used: 6101400, cereal_production: 43479000, cereal_yield: 71.261, population: 84086227},
    { country: "Germany", country_code: "DEU", year: 2023, land_used: 6059800, cereal_production: 42462800, cereal_yield: 70.073, population: 84548233},
    { country: "Germany", country_code: "DEU", year: 2024, land_used: 6080000, cereal_production: 43000000, cereal_yield: 70.500, population: 84800000},
    { country: "Germany", country_code: "DEU", year: 2025, land_used: 6100000, cereal_production: 43500000, cereal_yield: 71.000, population: 85100000},
    { country: "Ukraine", country_code: "UKR", year: 2022, land_used: 11602583, cereal_production: 53535588, cereal_yield: 46.141, population: 41048768},
    { country: "Ukraine", country_code: "UKR", year: 2023, land_used: 10634188, cereal_production: 59307680, cereal_yield: 55.771, population: 37732833}
];
  



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Herramientas de NeDB para poder guardar datos en el disco duro
import Datastore from '@seald-io/nedb';

// Creamos la base de datos con persistencia en un archivo físico
const db = new Datastore({ filename: './cereal-productions.db', autoload: true });

export function load_JLAV_API_V1(app) {

    const BASE_URL_V1 = "/api/v1/cereal-productions";

    // Portal de documentación creados en POSTMAN
    app.get(BASE_URL_V1 + "/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/52314819/2sBXigLt7a");
    });


    app.get(BASE_URL_V1 + "/loadInitialData", (req, res) => {
        // Comprobamos si hay datos en la base de datos
        db.count({}, (err, count) => {
            if (count === 0) {
                db.insert(initialData, (err, newDocs) => {
                    res.sendStatus(201); //201 Created 
                });
            } else {
                res.status(409).send("Array no esta vacio"); //409 Conflict
            }
        });
    });

    // Devuelve todos los recursos y permite filtrado
    app.get(BASE_URL_V1, (req, res) => {
        let query = {};

        //Parámetros de Paginación
        let offset = parseInt(req.query.offset) || 0;
        let limit = parseInt(req.query.limit) || 1000;

        //Filtrado por País y Código
        if (req.query.country) {
            query.country = new RegExp("^" + req.query.country + "$", "i");
        }
        if (req.query.country_code) {
            query.country_code = new RegExp("^" + req.query.country_code + "$", "i");
        }

        //Filtrado por Año y Rango 
        if (req.query.year) {
            query.year = parseInt(req.query.year);
        }
        if (req.query.from && req.query.to) {
            query.year = { $gte: parseInt(req.query.from), $lte: parseInt(req.query.to) };
        }

        // Filtrado por campos numéricos
        if (req.query.land_used) {
            query.land_used = parseFloat(req.query.land_used);
        }
        if (req.query.cereal_production) {
            query.cereal_production = parseFloat(req.query.cereal_production);
        }
        if (req.query.cereal_yield) {
            query.cereal_yield = parseFloat(req.query.cereal_yield);
        }
        if (req.query.population) {
            query.population = parseInt(req.query.population);
        }

        //Buscamos en la base de datos con la query construida con todos los campos y usamos .skip() para el offset y .limit() para el límite 
        db.find(query, { _id: 0 }).skip(offset).limit(limit).exec((err, filteredData) => {
            res.status(200).json(filteredData);
        });
    });

    //Crea un nuevo recurso
    app.post(BASE_URL_V1, (req, res) => {
        const newItem = req.body;
        if (!newItem || !newItem.country || !newItem.year || !newItem.country_code || !newItem.land_used || !newItem.cereal_production || !newItem.cereal_yield || !newItem.population) {
            return res.status(400).send("La petición no tiene los campos esperados"); //400 Bad Request
        }

        // Comprobamos si ya existe el recurso
        db.findOne({ country: newItem.country, year: newItem.year }, (err, doc) => {
            if (doc) {
                return res.sendStatus(409); //409 Conflict
            } else {
                db.insert(newItem, (err, newDoc) => {
                    res.sendStatus(201); //201 Created 
                });
            }
        });
    });

    //Borra todos los recursos
    app.delete(BASE_URL_V1, (req, res) => {
        db.remove({}, { multi: true }, (err, numRemoved) => {
            res.sendStatus(200); //200 Ok
        });
    });

    //No permitido
    app.put(BASE_URL_V1, (req, res) => {
        res.sendStatus(405); //405 Method Not Allowed
    });

    //Obtener datos de un elemento
    app.get(BASE_URL_V1 + "/:country/:year", (req, res) => {
        const { country, year } = req.params;
        // Buscamos un elemento concreto
        db.findOne({ country: new RegExp("^" + country + "$", "i"), year: parseInt(year) }, { _id: 0 }, (err, resource) => {
            if (resource) {
                res.status(200).json(resource); //200 Ok
            } else {
                res.sendStatus(404); //404 Not Found
            }
        });
    });

    // Obtener todos los datos de un país concreto
    app.get(BASE_URL_V1 + "/:country", (req, res) => {
        const { country } = req.params;

        db.find({ country: new RegExp("^" + country + "$", "i") }, { _id: 0 }, (err, resources) => {
            if (resources.length > 0) {
                res.status(200).json(resources); // Devuelve el array de datos de ese país
            } else {
                res.sendStatus(404); // Si el array está vacío, el país no existe
            }
        });
    });



    //Borra un elemento concreto
    app.delete(BASE_URL_V1 + "/:country/:year", (req, res) => {
        const { country, year } = req.params;
        // Borramos el elemento que coincida
        db.remove({ country: new RegExp("^" + country + "$", "i"), year: parseInt(year) }, {}, (err, numRemoved) => {
            if (numRemoved > 0) {
                res.sendStatus(200); //200 Ok
            } else {
                res.sendStatus(404); //404 Not Found
            }
        });
    });

    //Actualiza los datos de un elemento
    app.put(BASE_URL_V1 + "/:country/:year", (req, res) => {
        const newItem = req.body;
        const { country, year } = req.params;

        if (!newItem || !newItem.country || !newItem.year || !newItem.country_code || !newItem.land_used || !newItem.cereal_production || !newItem.cereal_yield || !newItem.population) {
            return res.status(400).send("La petición no tiene los campos esperados");
        }

        // Verificamos si existe antes de actualizar
        db.findOne({ country: new RegExp("^" + country + "$", "i"), year: parseInt(year) }, (err, doc) => {
            if (!doc) {
                res.sendStatus(404); //404 Not Found
            } else {
                //Validación de coherencia entre URL y BODY
                if (newItem.country.toLowerCase() !== country.toLowerCase() || newItem.year !== parseInt(year)) {
                    res.status(400).send("El país o el año no coinciden con la URL");
                } else {
                    // Actualizamos en la base de datos
                    db.update({ country: new RegExp("^" + country + "$", "i"), year: parseInt(year) }, newItem, {}, (err, numReplaced) => {
                        res.sendStatus(200); //200 Ok
                    });
                }
            }
        });
    });

    //No permitido
    app.post(BASE_URL_V1 + "/:country/:year", (req, res) => {
        res.sendStatus(405); // 405 Method Not Allowed
    });


};








/////////////////////////////////////////////VERSIÓN 2//////////////////////////////////////////////////////////////////////////



export function load_JLAV_API_V2(app) {

    const BASE_URL_V2 = "/api/v2/cereal-productions";

    // Portal de documentación creados en POSTMAN
    app.get(BASE_URL_V2 + "/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/52314819/2sBXihrDdQ");
    });



    //carga inicial
    app.get(BASE_URL_V2 + "/loadInitialData", (req, res) => {
        // Comprobamos si hay datos en la base de datos
        db.count({}, (err, count) => {
            if (count === 0) {
                db.insert(initialData, (err, newDocs) => {
                    res.sendStatus(201); //201 Created 
                });
            } else {
                res.status(409).send("Array no esta vacio"); //409 Conflict
            }
        });
    });

    // Devuelve todos los recursos y permite filtrado
    app.get(BASE_URL_V2, (req, res) => {
        let query = {};

        //Parámetros de Paginación
        let offset = parseInt(req.query.offset) || 0;
        let limit = parseInt(req.query.limit) || 1000;

        //Filtrado por País y Código
        if (req.query.country) {
            query.country = new RegExp("^" + req.query.country + "$", "i");
        }
        if (req.query.country_code) {
            query.country_code = new RegExp("^" + req.query.country_code + "$", "i");
        }

        //Filtrado por Año y Rango 
        if (req.query.year) {
            query.year = parseInt(req.query.year);
        }
        if (req.query.from && req.query.to) {
            query.year = { $gte: parseInt(req.query.from), $lte: parseInt(req.query.to) };
        }

        // Filtrado por campos numéricos
        if (req.query.land_used) {
            query.land_used = parseFloat(req.query.land_used);
        }
        if (req.query.cereal_production) {
            query.cereal_production = parseFloat(req.query.cereal_production);
        }
        if (req.query.cereal_yield) {
            query.cereal_yield = parseFloat(req.query.cereal_yield);
        }
        if (req.query.population) {
            query.population = parseInt(req.query.population);
        }

        //Buscamos en la base de datos con la query construida con todos los campos y usamos .skip() para el offset y .limit() para el límite 
        db.find(query, { _id: 0 }).skip(offset).limit(limit).exec((err, filteredData) => {
            res.status(200).json(filteredData);
        });
    });

    //Crea un nuevo recurso
    app.post(BASE_URL_V2, (req, res) => {
        const newItem = req.body;
        const camposValidos = 
            newItem &&
            newItem.country && 
            newItem.country_code && 
            newItem.year !== undefined &&
            newItem.land_used !== undefined &&
            newItem.cereal_production !== undefined &&
            newItem.cereal_yield !== undefined &&
            newItem.population !== undefined;

        if (!camposValidos) {
            return res.status(400).send("La petición no tiene los campos esperados o están mal escritos");
        }
        // MODIFICACIÓN EXCLUSIVA DE V2: Validación de datos lógicos
        if (newItem.cereal_production <= 0 || newItem.population <= 0) {
            return res.status(400).send("V2 ERROR: La producción y la población deben ser valores positivos.");
        }
 
        // Comprobamos si ya existe el recurso
        db.findOne({ country: newItem.country, year: newItem.year }, (err, doc) => {
            if (doc) {
                return res.sendStatus(409); //409 Conflict
            } else {
                db.insert(newItem, (err, newDoc) => {
                    res.sendStatus(201); //201 Created 
                });
            }
        });
    });

    //Borra todos los recursos
    app.delete(BASE_URL_V2, (req, res) => {
        db.remove({}, { multi: true }, (err, numRemoved) => {
            res.status(200).send("borrados"); //200 Ok
        });
    });

    //No permitido
    app.put(BASE_URL_V2, (req, res) => {
        res.sendStatus(405); //405 Method Not Allowed
    });

    //Obtener datos de un elemento
    app.get(BASE_URL_V2 + "/:country/:year", (req, res) => {
        const { country, year } = req.params;
        // Buscamos un elemento concreto
        db.findOne({ country: new RegExp("^" + country + "$", "i"), year: parseInt(year) }, { _id: 0 }, (err, resource) => {
            if (resource) {
                res.status(200).json(resource); //200 Ok
            } else {
                res.sendStatus(404); //404 Not Found
            }
        });
    });

    // Obtener todos los datos de un país concreto
    app.get(BASE_URL_V2 + "/:country", (req, res) => {
        const { country } = req.params;

        db.find({ country: new RegExp("^" + country + "$", "i") }, { _id: 0 }, (err, resources) => {
            if (resources.length > 0) {
                res.status(200).json(resources); // Devuelve el array de datos de ese país
            } else {
                res.sendStatus(404); // Si el array está vacío, el país no existe
            }
        });
    });



    //Borra un elemento concreto
    app.delete(BASE_URL_V2 + "/:country/:year", (req, res) => {
        const { country, year } = req.params;
        // Borramos el elemento que coincida
        db.remove({ country: new RegExp("^" + country + "$", "i"), year: parseInt(year) }, {}, (err, numRemoved) => {
            if (numRemoved > 0) {
                res.sendStatus(200); //200 Ok
            } else {
                res.sendStatus(404); //404 Not Found
            }
        });
    });

    //Actualiza los datos de un elemento
    app.put(BASE_URL_V2 + "/:country/:year", (req, res) => {
        const newItem = req.body;
        const { country, year } = req.params;

        if (!newItem || !newItem.country || !newItem.year || !newItem.country_code || !newItem.land_used || !newItem.cereal_production || !newItem.cereal_yield || !newItem.population) {
            return res.status(400).send("La petición no tiene los campos esperados");
        }

        // Verificamos si existe antes de actualizar
        db.findOne({ country: new RegExp("^" + country + "$", "i"), year: parseInt(year) }, (err, doc) => {
            if (!doc) {
                res.sendStatus(404); //404 Not Found
            } else {
                //Validación de coherencia entre URL y BODY
                if (newItem.country.toLowerCase() !== country.toLowerCase() || newItem.year !== parseInt(year)) {
                    res.status(400).send("El país o el año no coinciden con la URL");
                } else {
                    // Actualizamos en la base de datos
                    db.update({ country: new RegExp("^" + country + "$", "i"), year: parseInt(year) }, newItem, {}, (err, numReplaced) => {
                        res.sendStatus(200); //200 Ok
                    });
                }
            }
        });
    });

    //No permitido
    app.post(BASE_URL_V2 + "/:country/:year", (req, res) => {
        res.sendStatus(405); // 405 Method Not Allowed
    });


};   