import { Router } from "express";
import { infoLugar } from "../../controllers/admin/informacion-lugar";


const router = Router();
router.get('/:pi_id', infoLugar);
export default router;