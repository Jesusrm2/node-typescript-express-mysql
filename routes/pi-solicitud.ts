import { Router } from "express";
import { deletePiSolicitud, getPiSolicitud, getPiSolicitudes, postPiSolicitud, putPiSolicitud } from "../controllers/pi-solicitud ";


const router = Router();

router.get('/', getPiSolicitudes);
router.get('/:pi_soli_id', getPiSolicitud);
router.post('/',postPiSolicitud);
router.put('/:pi_soli_id',putPiSolicitud);
router.delete('/:pi_soli_id',deletePiSolicitud);


export default router;