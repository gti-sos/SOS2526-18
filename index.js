import express from "express"; //Cargo la librería Express (el motor del servidor)
import cool from "cool-ascii-faces"; // Cargo la librería de las caritas
import { calculateAverage, average, field, country} from "./index-JLAV.js";
import { avgperCountry,datamcs} from "./index-MCS.js";

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


app.get("/samples/jlav", (req, res) => {
    res.send(`La media de ${field} para ${country} es: ${average}`);
});
    let avg=avgperCountry(datamcs,"China, mainland","production_tonnes");
app.get("/samples/mcs", (req, res) => {
    res.send("Average production in tonnes of mainland China: "+avg);
});
app.get("/api/v1/cereal-production", (req, res) => {
    res.send(`La media de cereal_production para Paraguay es: ${average}`);
});

//Encendemos el servidor
app.listen(port, () => {
    console.log(`Servidor listo y escuchando en el puerto ${port}`);
});
