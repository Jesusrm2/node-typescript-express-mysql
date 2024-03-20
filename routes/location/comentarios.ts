import { Router } from "express";
import { comentariosUnLugar } from "../../controllers/location/comentarios";

const router = Router();
router.get('/:pi_id', comentariosUnLugar);
export default router;