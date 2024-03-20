import { Router } from "express";
import { getNumMin } from "../../controllers/details/numero-min";

const router = Router();
router.get('/:per_id', getNumMin);
export default router;