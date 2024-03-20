import { Router } from "express";
import { getPiSolicitud, getPiSolicitudSemana } from "../../controllers/details/solicitud";



const router = Router();
router.get('/:per_id', getPiSolicitud);
router.get('/', getPiSolicitudSemana);
export default router;