import { Router } from "express";
import { calificaciones, getNumLugares } from "../../controllers/details/numero-lugar";


const router = Router();
router.get('/:per_id', getNumLugares);
router.post('/', calificaciones);
export default router;