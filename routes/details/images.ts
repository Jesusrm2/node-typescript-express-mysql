import { Router } from "express";
import { getImagenes } from "../../controllers/details/images";

const router = Router();
router.get('/:pi_id', getImagenes);
export default router;