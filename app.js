import express from "express";
import cors from "cors";
import cookie_parser from "cookie-parser";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import { db } from './db/connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const App = express();

App.use(express.json());
App.use(cors({
    origin: "http://localhost:3000",
}));

App.use(cookie_parser());



console.log(__dirname);


const PORT = 4000;
App.listen(PORT, () => {
    console.log(`Cinefilos funcionando en el puerto ${PORT}!`);
});

db.connect((error) => {
    if (error) {
        console.error("Error al conectar a la base de datos:", error);
        return;
    }
    console.log("Conexión exitosa a la base de datos MySQL");
});

db.on("error", (error) => {
    console.error("Error en la conexión a la base de datos2:", error);
});

App.get("/",(req,res) => res.sendFile(__dirname + "/index.html"));
App.get("/elMostacho/agendarCita",(req,res) => res.sendFile(__dirname + "/agendarCita.html"));
App.get("/elMostacho/crearUsuario",(req,res) => res.sendFile(__dirname + "/crearUsuario.html"));
App.get("/elMostacho/iniciarSesion",(req,res) => res.sendFile(__dirname + "/iniciarSesion.html"));
App.get("/elMostacho/dashboard",(req,res) => res.sendFile(__dirname + "/dashboard.html"));

App.use(express.static(path.join(__dirname, 'public')));

// Importar y usar las rutas
import agendarCita from "./routes/agendarCitas.js";
import auntenticacion from "./routes/auntenticacion.js";

App.use("/elMostacho/agendarCita", agendarCita);
App.use("/elMostacho/crearUsuario", auntenticacion);
App.use("/elMostacho/iniciarSesion", auntenticacion);



