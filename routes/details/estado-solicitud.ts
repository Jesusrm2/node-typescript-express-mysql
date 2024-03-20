import { Router } from "express";
import { getEstadoSolicitudes, getEstadoSolicitudesTotal } from "../../controllers/details/estado-solicitud";


const router = Router();
router.get('/:per_id', getEstadoSolicitudes);
router.get('/', getEstadoSolicitudesTotal);
export default router;