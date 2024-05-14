import { db } from '../db/connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const obtenerRoles = (req, res) => {
    db.query("SELECT * FROM roles", (error, result) => {
        if (error) {
            console.error("Error al obtener roles:", error);
            return res.status(500).json({ mensaje: "Error al obtener roles" });
        }
        res.status(200).json(result);
    });
};

export const crearUsuario = (req, res) => {
    const { nombre, contrasenia, id_role } = req.body;
    const verificarUsuario = `SELECT * FROM usuarios WHERE nombre = ?`;

    if (!nombre || !contrasenia || !id_role) {
        return res.status(400).json({ mensaje: "Faltan datos" });
    }
    db.query(verificarUsuario, [nombre], async (error, result) => {
        if (error) {
            console.error("Error al verificar usuario:", error);
            return res.status(500).json({ mensaje: "Error al verificar usuario" });
        }
        if (result.length > 0) {
            return res.status(400).json({ mensaje: "El usuario ya existe" });
        }
        const hashedPassword = await bcrypt.hash(contrasenia, 10);
        db.query(
            `INSERT INTO usuarios (nombre, contrasenia, id_role) VALUES (?,?,?)`,
            [nombre, hashedPassword, id_role],
            (error, result) => {
                if (error) {
                    console.error("Error al crear usuario:", error);
                    return res.status(500).json({ mensaje: "Error al crear usuario" });
                }
                res.status(201).json({ mensaje: "Usuario creado correctamente" });
            }
        );
    });
} 

export const iniciarSesion = (req, res) => {
    const { nombre, contrasenia } = req.body;
    const obtenerUsuario = `SELECT * FROM usuarios WHERE nombre = ?`;

    if (!nombre || !contrasenia) {
        return res.status(400).json({ mensaje: "Faltan datos" });
    }
    db.query(obtenerUsuario, [nombre], async (error, result) => {
        if (error) {
            console.error("Error al obtener usuario:", error);
            return res.status(500).json({ mensaje: "Error al obtener usuario" });
        }
        if (result.length === 0) {
            return res.status(400).json({ mensaje: "Usuario no encontrado" });
        }
        const usuario = result[0];
        const contraseniaValida = await bcrypt.compare(contrasenia, usuario.contrasenia);
        if (!contraseniaValida) {
            return res.status(400).json({ mensaje: "Contraseña incorrecta" });
        }
        const token = jwt.sign({ id: usuario.id, nombre: usuario.nombre }, "secret", { expiresIn: "1h" });
        res.status(200).json({ token });
    });
}

export const verificarToken = (req, res) => {
    // Obtener el token del cuerpo de la solicitud
    const { token } = req.body;

    // Verificar si hay un token
    if (!token) {
        return res.status(401).json({ mensaje: "Token no proporcionado" });
    }

    // Decodificar el token para obtener los datos del usuario
    jwt.verify(token, "secret", (error, decodedToken) => {
        if (error) {
            // Si hay un error al verificar el token, devuelve un mensaje de error
            console.error("Error al verificar el token:", error);
            return res.status(401).json({ mensaje: "Token inválido" });
        } else {
            // Si el token es válido, devuelve los datos del usuario
            const { nombre } = decodedToken;
            return res.status(200).json({ valido: true, nombreUsuario: nombre });
        }
    });
};
