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

function mediaPorRegion(datos, region, campoNumerico) {
    // Filtra las filas que pertenecen a la región indicada
    const subconjunto = datos.filter(d => d.region === region);

    // Extraer solo los valores del campo numérico especificado
    const valores = subconjunto.map(d => d[campoNumerico]);
    
    // Calcular la suma total
    const suma = valores.reduce((acum, valor) => acum + valor, 0);
    
    // Calcular la media    
    const media =  suma / valores.length;

    return media
}

// EJECUCIÓN mediaPorRegion
export const region_nvd = "Europe";
export const campo_nvd = "annual_cost_healthy_diet_usd";

export const resultado_nvd = mediaPorRegion(data, region_nvd, campo_nvd);

console.log(`La media de ${campo_nvd} en la región ${region_nvd} es : ${resultado_nvd}`);

export { mediaPorRegion };
export const datosnvd = data;

export function load_NVD_API(app){
    const BASE_URL = "/api/v1/cost-of-healthy-diet-by-countries";
    
    //Datos en memoria
    let nvdAPIDATA = [...datosnvd];

    //Carga inicial
    app.get(BASE_URL + "/loadInitialData", (req,res) => {
        if(nvdAPIDATA.length === 0){
            nvdAPIDATA = [...datosnvd];
            res.sendStatus(201); //201 Created
        }else{
            res.status(400).send("Array no está vacío"); //400 Bad Request
        }
    });

    // Devuelve todos los recursos (y con filtrado)
    app.get(BASE_URL, (req, res) =>{
        let results = [...nvdAPIDATA];

        // Filtrado opcional según query parameters
        if (req.query.year) {
            //const year = parseInt(req.query.year);
            results = results.filter(d => d.year === parseInt(req.query.year));
        }
        if (req.query.from && req.query.to){
            results = results.filter(d => d.year >= parseInt(req.query.from) && d.year <= parseInt(req.query.to));
        }
        if (req.query.region) {
            results = results.filter(d => d.region.toLowerCase() === req.query.region.toLowerCase());
        }
        if (req.query.country) {
            results = results.filter(d => d.country.toLowerCase() === req.query.country.toLowerCase());
        }
        res.status(200).json(results);
    });

    //Acceso a un dato concreto (por pais y año)
    app.get("/api/v1/cost-of-healthy-diet-by-countries/:country/:year", (req,res) => {
        let nvdAPIDATA = [...datosnvd];
        const { country,year } = req.params;
        const yearInt = parseInt(year);
        const record = nvdAPIDATA.find(r => r.country.toLowerCase() === country.toLowerCase() && r.year === yearInt);
        if (record){
            res.status(200).json(record); //Devuelve el objeto encontrado
        }
        else {
            res.sendStatus(404); // No encontrado
        }
    });



    // Crea un nuevo recurso
    app.post(BASE_URL, (req,res) =>{
        const newItem = req.body;
        if(!newItem || !newItem.region || !newItem.year){
            return res.sendStatus(400); // 400 Bad Request
        }
        const exists = nvdAPIDATA.some(d => d.region === newItem.region && d.year === newItem.year);
        if (exists) return res.sendStatus(409); // 409 Conflict
        nvdAPIDATA.push(newItem);
        res.sendStatus(201);
    });

    // Borra todos los recursos
    app.delete(BASE_URL, (req,res) => {
        nvdAPIDATA = []; //Array vacío
        res.sendStatus(200); // 200 Ok
    });

    //No permitido PUT en la colección
    app.put(BASE_URL, (req,res) =>{
        res.sendStatus(405); // 405 method Not Allowed
    });

    //Obtener datos de un elemento en específico
    app.get(BASE_URL + "/:region/:year", (req,res) =>{
        const { region, year } = req.params;
        const resource = nvdAPIDATA.find(d => d.region === region && d.year=== parseInt(year));
        if (resource) res.status(200).json(resource);
        else res.sendStatus(400);
    });

    //Borra un elemento concreto
    app.delete(BASE_URL + "/:region/:year", (req,res) => {
        const { region,year } = req.params;
        const initialLength = nvdAPIDATA.length;
        nvdAPIDATA = nvdAPIDATA.filter(d => !(d.region === region && d.year === parseInt(year)));
        if (nvdAPIDATA.length < initialLength) res.sendStatus(200);
        else res.sendStatus(404);
    });

    // Actualiza un elemento
    app.put(BASE_URL + "/:region/:year", (req,res) => {
        const newItem = req.body;
        const { region, year } = req.params;
        const index = nvdAPIDATA.findIndex(d => d.region === region && d.year ===parseInt(year));
        if (index === -1) return res.sendStatus(404);
        if (newItem.region !== region || newItem.year !== parseInt(year)) {
            return res.status(400).send("La región o el año no coinciden con la URL");
        }
        nvdAPIDATA[index] = newItem;
        res.sendStatus(200);
    })

    // No permitido POST en recurso concreto
    app.post(BASE_URL + "/:region/:year", (req,res) => {
        res.sendStatus(405);
    });



}