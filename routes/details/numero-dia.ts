import { Router } from "express";
import { getNumDias } from "../../controllers/details/numero-dias";


const router = Router();
router.get('/:per_id', getNumDias);
export default router;