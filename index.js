import express from "express"; //Cargo la librería Express (el motor del servidor)
import cors from "cors";
import { BackendMCS} from "./src/back/index-MCS.js";
import { load_JLAV_API} from "./src/back/index-JLAV.js";
import { load_NVD_API } from "./src/back/index-NVD.js";
import {handler} from './src/front/build/handler.js'; //buscador dentro de archivos sveltepara que express sepa que arechivos servir


const port = process.env.PORT || 12345; //El puerto: Render nos da uno, si no, usa el 12345

const app = express(); //Creamos la aplicación

app.use(cors());


app.use(express.json()); //Para que el servidor entienda datos en formato JSON

// Si la ruta solicitada no coincide con ninguna ruta dinámica (API), 
// el servidor intentará localizar el archivo dentro de la carpeta './public'.
app.use("/", express.static("./public")); 
 

//activacion apis jlav
load_JLAV_API(app);

//activacion apis mcs
BackendMCS(app);

//activacion api nvd
load_NVD_API(app);


app.use(handler)


//Encendemos el servidor
app.listen(port, () => {
    console.log(`Servidor listo y escuchando en el puerto ${port}`);
});
