import { Router } from "express";
import { getCalificacionesSemana, getNumCalificados } from "../../controllers/details/numero-calificacion";


const router = Router();
router.get('/:per_id', getNumCalificados);
router.get('/', getCalificacionesSemana);
export default router;