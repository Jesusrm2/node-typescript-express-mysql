import { Router } from "express";
import { getHoraPuntoIntereses } from "../../controllers/details/hora-pi";

const router = Router();
router.get('/:iti_dia_id', getHoraPuntoIntereses);
export default router;