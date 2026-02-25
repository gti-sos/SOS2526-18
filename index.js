import express from "express"; //Cargo la librería Express (el motor del servidor)
import bodyParser from "body-parser";
import cool from "cool-ascii-faces"; // Cargo la librería de las caritas
import { calculateAverage, average, field, country} from "./index-JLAV.js";
import { avgperCountry,datamcs} from "./index-MCS.js";

const app = express(); //Creamos la aplicación
const port = process.env.PORT || 12345; //El puerto: Render nos da uno, si no, usa el 12345

app.use(express.json()); //Para que el servidor entienda datos en formato JSON

// Si la ruta solicitada no coincide con ninguna ruta dinámica (API), 
// el servidor intentará localizar el archivo dentro de la carpeta './public'.
app.use("/", express.static("./public")); 

//activar body-parser para deserializar
app.use(bodyParser.json());

//Ruta para la carita ASCII
app.get("/cool", (req, res) => {
    console.log(cool());
    res.send(`<html><body><h1></h1>${cool()}</body></html>`);
});


app.get("/samples/jlav", (req, res) => {
    res.send(`La media de ${field} para ${country} es: ${average}`);
});


app.use("/", express.static("./public"));

let avg=avgperCountry(datamcs,"China, mainland","production_tonnes");
app.get("/samples/mcs", (req, res) => {
    res.send("Average production in tonnes of mainland China: "+avg);
});

app.get("/api/v1/cereal-production", (req, res) => {
    res.send(`La media de cereal_production para Paraguay es: ${average}`);
});

//get MCS
app.get("/api/v1/food-supply-utilization-accounts", (req, res) => {
    res.send(JSON.stringify(datamcs,null,2));
});



app.get("/api/v1/food-supply-utilization-accounts/:country", (req, res) => {
    const country = req.params.country;

    const filtered = datamcs.filter(d => d.country_name_en.toLowerCase() === country.toLowerCase());

    if (filtered.length === 0) {
        return res.status(404).json({ error: "Not Found" });
    }

    res.status(200).json(filtered);
});


//post mcs
app.post("/api/v1/food-supply-utilization-accounts", (req, res) => {
    let newData=req.body;
    datamcs.push(newData);
    res.sendStatus(201,"CREATED")
});


app.post("/api/v1/food-supply-utilization-accounts/:country", (req, res) => {
    res.sendStatus(405);
});


app.post("/api/v1/food-supply-utilization-accounts", (req, res) => {
    let newData = req.body;
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

    const missing = requiredFields.filter(f => !(f in newData));
    if (missing.length > 0) {
        return res.status(400).json({
            error: "Bad Request",
            missing_fields: missing
        });
    }

    const exists = datamcs.some(
        d => d.country_name_en === newData.country_name_en &&
             d.year === newData.year &&
             d.item === newData.item
    );

    if (exists) {
        return res.status(409).json({
            error: "Conflict: the resource already exists"
        });
    }

    datamcs.push(newData);
    return res.status(201).json({ message: "Created" });
});


//put mcs

app.put("/api/v1/food-supply-utilization-accounts", (req, res) => {
    res.sendStatus(405); // Method Not Allowed
});

app.put("/api/v1/food-supply-utilization-accounts/:country", (req, res) => {
    const country = req.params.country;
    const body = req.body;

    const index = datamcs.findIndex(
        d => d.country_name_en.toLowerCase() === country.toLowerCase()
    );

    if (index === -1) {
        return res.status(404).json({ error: "Not Found" });
    }

    datamcs[index] = body;

    return res.status(200).json({ message: "Updated" });
});

//delete mcs
app.delete("/api/v1/food-supply-utilization-accounts/:country", (req, res) => {
    const country = req.params.country;

    const before = datamcs.length;

    datamcs = datamcs.filter(
        d => d.country_name_en.toLowerCase() !== country.toLowerCase()
    );

    if (before === datamcs.length) {
        return res.status(404).json({ error: "Not Found" });
    }

    return res.sendStatus(200);
});



//Encendemos el servidor
app.listen(port, () => {
    console.log(`Servidor listo y escuchando en el puerto ${port}`);
});
