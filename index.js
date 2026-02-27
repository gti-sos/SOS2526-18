import express from "express"; //Cargo la librería Express (el motor del servidor)
import bodyParser from "body-parser";
import cool from "cool-ascii-faces"; // Cargo la librería de las caritas
import { calculateAverage, average, field, country} from "./index-JLAV.js";
import { avgperCountry,datamcs} from "./index-MCS.js";
import { load_JLAV_API} from "./index-JLAV.js";
import mcsrouter from "./index-MCS.js";
import { mediaPorRegion, datosnvd, campo_nvd, region_nvd } from "./index-NVD.js";
import { load_NVD_API } from "./index-NVD.js";

const app = express(); //Creamos la aplicación
const port = process.env.PORT || 12345; //El puerto: Render nos da uno, si no, usa el 12345

app.use(express.json()); //Para que el servidor entienda datos en formato JSON

// Si la ruta solicitada no coincide con ninguna ruta dinámica (API), 
// el servidor intentará localizar el archivo dentro de la carpeta './public'.
app.use("/", express.static("./public")); 


//Ruta para la carita ASCII
app.get("/cool", (req, res) => {
    console.log(cool());
    res.send(`<html><body><h1></h1>${cool()}</body></html>`);
});


//resultado del cálculo del algoritmojlav
app.get("/samples/jlav", (req, res) => {
    res.send(`La media de ${field} para ${country} es: ${average}`);
});
//activacion apis jlav
load_JLAV_API(app);





//resultado del cálculo del algoritmo mcs
let avg=avgperCountry(datamcs,"China, mainland","production_tonnes");
app.get("/samples/mcs", (req, res) => {
    res.send("Average production in tonnes of mainland China: "+avg);
});
//activacion api mcs
app.use("/api/v1/food-supply-utilization-accounts", mcsrouter);



//resultado del cálculo del algoritmo nvd
let resultadoNVD = mediaPorRegion(datosnvd, region_nvd, campo_nvd);
app.get("/samples/nvd", (req, res) => {
    res.send("La media de " + campo_nvd + " en la región " + region_nvd + " es: " + resultadoNVD)
})
//activacion api nvd
load_NVD_API(app);




//Encendemos el servidor
app.listen(port, () => {
    console.log(`Servidor listo y escuchando en el puerto ${port}`);
});
