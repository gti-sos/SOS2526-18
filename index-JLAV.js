
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
    { country: "Paraguay", country_code: "PRY", year: 2005, land_used: 806850, cereal_production: 1749200, cereal_yield: 2.16, population: 5448100 }
];

//Algoritmo para calcular la media
export function calculateAverage(dataArray, Country, field) {
    
    //Filtrar el subconjunto de filas que comparten el país
    const filteredRows = dataArray.filter(item => item.country === Country);

    //Extraer los valores numéricos del campo elegido y ver sea un valor numérico
    const values = filteredRows.map(item => item[field]).filter(v => v !== null && !isNaN(v));

    //Calcular la media usando reduce
    if (values.length === 0) return 0;

    const sum = values.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum / values.length;
}

//Calcular media de 'cereal_production' para 'Paraguay'
export const country = "Paraguay";
export const field = "cereal_production";
export const average = calculateAverage(initialData, country, field);

//Mostrar el resultado
//console.log(`La media de ${field} para ${country} es: ${average}`);






// Operaciones sobre recursos
let data = [];
export function load_JLAV_API(app) {
    const BASE_URL = "/api/v1/cereal-productions";

    //carga inicial
    app.get(BASE_URL + "/loadInitialData", (req, res) => {
        if (data.length === 0) {
            data = [...initialData];
            res.sendStatus(201); //201 Created 
        } else {
            res.status(400).send("Array no esta vacio"); //400 Bad Request
        }
    });

    //Devuelve todos los recursos
    app.get(BASE_URL, (req, res) => {
        res.status(200).json(data); // 200 Ok
    });

    //Crea un nuevo recurso
    app.post(BASE_URL, (req, res) => {
        const newItem = req.body;
        if (!newItem || !newItem.country || !newItem.year) {
            return res.sendStatus(400); //400 Bad Request
        }
        const exists = data.some(d => d.country === newItem.country && d.year === newItem.year);
        if (exists) {
            return res.sendStatus(409); //409 Conflict
        }
        data.push(newItem);
        res.sendStatus(201); //201 Created 
    });

    //Borra todos los recursos
    app.delete(BASE_URL, (req, res) => {
        data = [];
        res.sendStatus(200); //200 Ok
    });

    //No permitido
    app.put(BASE_URL, (req, res) => {
        res.sendStatus(405); //405 Method Not Allowed
    });

    //Obtener datos de un elemento
    app.get(BASE_URL + "/:country/:year", (req, res) => {
        const {country,year} = req.params;
        const resource = data.find(d => d.country.toLowerCase() === country.toLowerCase() && d.year === parseInt(year));
        if (resource) {
            res.status(200).json(resource); //200 Ok
        } else {
            res.sendStatus(404); //404 Not Found
        }
    });

    //Borra un elemento concreto
    app.delete(BASE_URL + "/:country/:year", (req, res) => {
        const {country, year} = req.params;
        const longitudInicial = data.length;
        data = data.filter(d => !(d.country.toLowerCase() === country.toLowerCase() && d.year === parseInt(year)));
        if (data.length < longitudInicial) {
            res.sendStatus(200); //200 Ok
        } else {
            res.sendStatus(404); //404 Not Found
        }
    });

    //Actualiza los datos de un elemento
    app.put(BASE_URL + "/:country/:year", (req, res) => {
        const newItem = req.body;
        const {country, year} = req.params;
        const index = data.findIndex(d => d.country.toLowerCase() === country.toLowerCase() && d.year === parseInt(year));
        
        if (index === -1) {
            res.sendStatus(404); //404 Not Found
        }else {
            if (newItem.country.toLowerCase() !== country.toLowerCase() || newItem.year !== parseInt(year)) { //por si acaso nos equivocamos y metemos el registro de otro pais diferente
                res.status(400).send("El país o el año no coinciden con la URL");
            }
            else{
            data[index] = req.body;
            res.sendStatus(200); //200 Ok
            }
        }
    });

    //No permitido
    app.post(BASE_URL + "/:country/:year", (req, res) => {//No tiene sentido crear algo en una direccion que ya esxiste
        res.sendStatus(405); // 405 Method Not Allowed
    });
}