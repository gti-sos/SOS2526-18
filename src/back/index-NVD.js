const data = [
    {
        country_code: 156, 
        country: "China, mainland", 
        region: "Asia", 
        year: 2020, 
        cost_healthy_diet_ppp_usd: 3.25, 
        annual_cost_healthy_diet_usd: 1186.25, 
        cost_vegetables_ppp_usd: 0.81, 
        cost_fruits_ppp_usd: 0.68,  
        total_food_components_cost: 1.51, 
        cost_category: "High Cost"
    },
    {
        country_code: 156, 
        country: "China, mainland", 
        region: "Asia", 
        year: 2021, 
        cost_healthy_diet_ppp_usd: 3.13, 
        annual_cost_healthy_diet_usd: 1142.45, 
        cost_vegetables_ppp_usd: 0.6, 
        cost_fruits_ppp_usd: 0.74,  
        total_food_components_cost: 1.34, 
        cost_category: "High Cost"
    },
    {
        country_code: 156, 
        country: "China, mainland", 
        region: "Asia", 
        year: 2022, 
        cost_healthy_diet_ppp_usd: 3.41, 
        annual_cost_healthy_diet_usd: 1244.65, 
        cost_vegetables_ppp_usd: 0.74, 
        cost_fruits_ppp_usd: 0.63,  
        total_food_components_cost: 1.32, 
        cost_category: "High Cost"
    },
    {
        country_code: 818, 
        country: "Egypt", 
        region: "Africa", 
        year: 2020, 
        cost_healthy_diet_ppp_usd: 3.88, 
        annual_cost_healthy_diet_usd: 1416.2, 
        cost_vegetables_ppp_usd: 0.79, 
        cost_fruits_ppp_usd: 0.73,  
        total_food_components_cost: 1.48, 
        cost_category: "High Cost"
    },
    {
        country_code: 818, 
        country: "Egypt", 
        region: "Africa", 
        year: 2021, 
        cost_healthy_diet_ppp_usd: 4.01, 
        annual_cost_healthy_diet_usd: 1463.65, 
        cost_vegetables_ppp_usd: 0.52, 
        cost_fruits_ppp_usd: 0.42,  
        total_food_components_cost: 0.94, 
        cost_category: "High Cost"
    },
    {
        country_code: 818, 
        country: "Egypt", 
        region: "Africa", 
        year: 2022, 
        cost_healthy_diet_ppp_usd: 4.69, 
        annual_cost_healthy_diet_usd: 1711.85, 
        cost_vegetables_ppp_usd: 0.86, 
        cost_fruits_ppp_usd: 0.69,  
        total_food_components_cost: 1.32, 
        cost_category: "High Cost"
    },
    {
        country_code: 76, 
        country: "Brazil", 
        region: "Americas", 
        year: 2020, 
        cost_healthy_diet_ppp_usd: 3.69, 
        annual_cost_healthy_diet_usd: 1346.85, 
        cost_vegetables_ppp_usd: 0.78, 
        cost_fruits_ppp_usd: 0.61,  
        total_food_components_cost: 1.59, 
        cost_category: "High Cost"
    },
    {
        country_code: 76, 
        country: "Brazil", 
        region: "Americas", 
        year: 2021, 
        cost_healthy_diet_ppp_usd: 3.97, 
        annual_cost_healthy_diet_usd: 1449.05, 
        cost_vegetables_ppp_usd: 0.69, 
        cost_fruits_ppp_usd: 0.67,  
        total_food_components_cost: 1.36, 
        cost_category: "High Cost"
    },
    {
        country_code: 76, 
        country: "Brazil", 
        region: "Americas", 
        year: 2022, 
        cost_healthy_diet_ppp_usd: 4.39, 
        annual_cost_healthy_diet_usd: 1602.35, 
        cost_vegetables_ppp_usd: 0.78, 
        cost_fruits_ppp_usd: 0.65,  
        total_food_components_cost: 1.57, 
        cost_category: "High Cost"
    },
    {
        country_code: 826, 
        country: "United Kingdom", 
        region: "Europe", 
        year: 2020, 
        cost_healthy_diet_ppp_usd: 1.86, 
        annual_cost_healthy_diet_usd: 678.9, 
        cost_vegetables_ppp_usd: 0.8, 
        cost_fruits_ppp_usd: 0.7,  
        total_food_components_cost: 1.34, 
        cost_category: "Medium Cost"
    },
    {
        country_code: 826, 
        country: "United Kingdom", 
        region: "Europe", 
        year: 2021, 
        cost_healthy_diet_ppp_usd: 1.9, 
        annual_cost_healthy_diet_usd: 693.5, 
        cost_vegetables_ppp_usd: 0.43, 
        cost_fruits_ppp_usd: 0.57,  
        total_food_components_cost: 1, 
        cost_category: "Medium Cost"
    },
    {
        country_code: 826, 
        country: "United Kingdom", 
        region: "Europe", 
        year: 2022, 
        cost_healthy_diet_ppp_usd: 2.21, 
        annual_cost_healthy_diet_usd: 806.65, 
        cost_vegetables_ppp_usd: 0.82, 
        cost_fruits_ppp_usd: 0.68,  
        total_food_components_cost: 1.35, 
        cost_category: "Medium Cost"
    },
    {
        country_code: 724, 
        country: "Spain", 
        region: "Europe", 
        year: 2020, 
        cost_healthy_diet_ppp_usd: 2.75, 
        annual_cost_healthy_diet_usd: 1003.75, 
        cost_vegetables_ppp_usd: 0.71, 
        cost_fruits_ppp_usd: 0.67,  
        total_food_components_cost: 1.52, 
        cost_category: "High Cost"
    },
    {
        country_code: 724, 
        country: "Spain", 
        region: "Europe", 
        year: 2021, 
        cost_healthy_diet_ppp_usd: 2.94, 
        annual_cost_healthy_diet_usd: 1073.1, 
        cost_vegetables_ppp_usd: 0.8, 
        cost_fruits_ppp_usd: 0.84,  
        total_food_components_cost: 1.64, 
        cost_category: "High Cost"
    },
    {
        country_code: 724, 
        country: "Spain", 
        region: "Europe", 
        year: 2022, 
        cost_healthy_diet_ppp_usd: 3.4, 
        annual_cost_healthy_diet_usd: 1241.1, 
        cost_vegetables_ppp_usd: 0.76, 
        cost_fruits_ppp_usd: 0.7,  
        total_food_components_cost: 1.33, 
        cost_category: "High Cost"
    }
];


//Carga API
import Datastore from "@seald-io/nedb";

export function load_NVD_API(app){
    const BASE_URL = "/api/v1/cost-of-healthy-diet-by-countries";

    //Datos en db
    const db = new Datastore({filename: "cost-of-healthy-diet-by-countries.db", autoload:true});


    // Get colleccion postman
    app.get(BASE_URL + "/docs", (req,res) => {
        res.redirect("https://documenter.getpostman.com/view/52413337/2sBXigKYBy");
    });

    //Carga inicial
    app.get(BASE_URL + "/loadInitialData", (req,res) => {
        db.count({}, (err, count) => {
            if(count > 0){
                return res.status(400).send("Array no está vacío");
            }
            db.insert(data, (err) => {
                if (err) 
                    return res.sendStatus(500);
                res.sendStatus(201);
            });
        });
    });

    // Devuelve todos los recursos con filtrado y paginación
    app.get(BASE_URL, (req, res) =>{
        let query = {};

        // Filtrado opcional según query parameters
        if (req.query.country) 
            query.country = req.query.country;
        if (req.query.region)
            query.region = req.query.region;
        if (req.query.year)
            query.year = parseInt(req.query.year);
        if (req.query.cost_category)
            query.cost_category = req.query.cost_category;
        if (req.query.country_code)
            query.country_code = parseInt(req.query.country_code);

        if(req.query.from || req.query.to){
            query.year = {};
            if(req.query.from)
                query.year.$gte = parseInt(req.query.from);
            if (req.query.to)
                query.year.$lte = parseInt(req.query.to);
        }

        //paginación
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;
        const skip = (page - 1)*limit;

        db.find(query).sort({country:1, year:1}).skip(skip).limit(limit).exec((err,docs) =>{
            if (err)
                return res.sendStatus(500);
            res.status(200).json(docs);
        });
    });

    //Acceso a un recurso concreto (por pais y año) 
    app.get(BASE_URL + "/:country/:year", (req,res) => {
        const { country, year } = req.params;
        db.findOne({country: country, year: parseInt(year) }, (err,doc) =>{
            if(!doc)
                return res.sendStatus(404);
            res.status(200).json(doc);
        });
    });



    // Crea un nuevo recurso
    app.post(BASE_URL, (req,res) =>{
        const newItem = req.body;
        if(!newItem || !newItem.region || !newItem.year){
            return res.sendStatus(400); // 400 Bad Request
        }
        db.findOne({ country: newItem.country, year: newItem.year }, (err, existing) =>{
            if (existing) return res.sendStatus(409); // 409 Conflict
            db.insert(newItem, (err) =>{
                if(err) return res.sendStatus(500);
                res.sendStatus(201);
            });
        });
    });

    // Borra todos los recursos
    app.delete(BASE_URL, (req,res) => {
        db.remove({}, {multi:true}, (err) => {
            if (err) return res.sendStatus(500);
            res.sendStatus(200);
        });
    });

    //No permitido PUT en la colección
    app.put(BASE_URL, (req,res) =>{
        res.sendStatus(405); // 405 method Not Allowed
    });

    //Borra un elemento concreto
    app.delete(BASE_URL + "/:country/:year", (req,res) => {
        const { country,year } = req.params;
        db.remove({country:country,year:parseInt(year)}, {}, (err,numRemoved) => {
            if(numRemoved === 0) return res.sendStatus(404);
            res.sendStatus(200);
        });
    });

    // Actualiza un elemento
    app.put(BASE_URL + "/:country/:year", (req, res) => {
        const newItem = req.body;
        const { country, year } = req.params;
        const yearInt = parseInt(year);

        const requiredFields = ["country_code", "country", "region", "year", "cost_healthy_diet_ppp_usd", "annual_cost_healthy_diet_usd", "cost_vegetables_ppp_usd", "cost_fruits_ppp_usd", "total_food_components_cost", "cost_category"];
        const hasAllFields = requiredFields.every(field => field in newItem);
        if (!hasAllFields) return res.status(400).send("Faltan campos obligatorios");

        if (newItem.country !== country || newItem.year !== yearInt) {
            return res.status(400).send("El país o el año no coinciden con la URL");
        }
        db.update({country: country, year:yearInt}, {$set:newItem}, {}, (err, numReplaced) => {
            if (numReplaced === 0) return res.sendStatus(404);
            res.sendStatus(200);
        });
    });

    // No permitido POST en recurso concreto
    app.post(BASE_URL + "/:country/:year", (req,res) => {
        res.sendStatus(405);
    });


}