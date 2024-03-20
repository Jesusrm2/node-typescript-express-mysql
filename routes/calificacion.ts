import { Router } from "express";
import { deletecalificacion, getcalificacion, getcalificacions, postcalificacion, putcalificacion } from "../controllers/calificacion";

const router = Router();

router.get('/', getcalificacions);
router.get('/:cal_id', getcalificacion);
router.post('/', postcalificacion);
router.put('/:cal_id', putcalificacion);
router.delete('/:cal_id', deletecalificacion);

export default router;