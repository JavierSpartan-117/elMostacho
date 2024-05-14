import { db } from '../db/connection.js';

export const agendarCita = (req, res) => {
    const { nombre, apellido, telefono } = req.body;
    console.log(req.body);
    if (!nombre || !apellido || !telefono) {
        return res.status(400).json({ mensaje: "Faltan datos" });
    }
    db.query(
        `INSERT INTO clientes (nombre, apellido, telefono) VALUES (?,?,?)`,
        [nombre, apellido, telefono],
        (error, result) => {
            if (error) {
                console.error("Error al agendar cita:", error);
                return res.status(500).json({ mensaje: "Error al agendar cita" });
            }
            res.status(201).json({ mensaje: "Cita agendada correctamente" });
        }
    );
}