
import { Router } from "express";
import { getRequerimientos } from "../../controllers/details/requisitos";

const router = Router();
router.get('/:pi_id', getRequerimientos);
export default router;