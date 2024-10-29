import express from "express";
import {
  createSpecialty,
  getAllSpecialties,
  getSpecialtyById,
  updateSpecialty,
  deleteSpecialty,
} from "../controllers/specialtyController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { isTokenRevoked } from "../middlewares/isTokenRevoked.js";

const router = express.Router();

router.post("/", authenticate, isTokenRevoked, authorizeAdmin, createSpecialty); // Crear una especialidad
router.get("/", getAllSpecialties); // Obtener todas las especialidades
router.get("/:id", getSpecialtyById); // Obtener una especialidad por ID
router.put("/:id", authenticate, isTokenRevoked, authorizeAdmin, updateSpecialty); // Actualizar una especialidad
router.delete("/:id", authenticate, isTokenRevoked, authorizeAdmin, deleteSpecialty); // Eliminar una especialidad

export default router;
