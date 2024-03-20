import { Router } from "express";
import { infoPersona } from "../../controllers/details/infor-persona";



const router = Router();
router.get('/:per_id', infoPersona);
export default router;