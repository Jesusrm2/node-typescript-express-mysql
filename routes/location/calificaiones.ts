import { Router } from "express";
import { calificacionesGeneralLugar } from "../../controllers/location/calificaiones";


const router = Router();
router.get('/:pi_id', calificacionesGeneralLugar);
export default router;