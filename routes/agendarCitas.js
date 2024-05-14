import express from "express";
import { agendarCita } from "../controllers/agendarCitas.js";
const router = express.Router();

router.post("/crearCita", agendarCita);

export default router;