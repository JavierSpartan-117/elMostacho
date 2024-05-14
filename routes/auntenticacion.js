import express from 'express';
import { obtenerRoles } from '../controllers/autenticacion.js';
import { crearUsuario } from '../controllers/autenticacion.js';
import { iniciarSesion } from '../controllers/autenticacion.js';
import { verificarToken } from '../controllers/autenticacion.js';   
const router = express.Router();

router.get('/roles', obtenerRoles);
router.post('/crearUsuario', crearUsuario);
router.post('/iniciarSesion', iniciarSesion);
router.post('/verificarToken', verificarToken);

export default router;