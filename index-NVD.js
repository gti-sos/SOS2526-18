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
        year: 2020, 
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
const region = "Europe";
const campo = "annual_cost_healthy_diet_usd";

const resultado = mediaPorRegion(data, region, campo);

console.log(`La media de ${campo} en la región ${region} es : ${resultado}`);
