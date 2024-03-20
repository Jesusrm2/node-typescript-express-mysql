import { Router } from "express";
import { getPuntosInteresCercanos, getTotalUsuarios } from "../../controllers/details/lugares-cercanos";


const router = Router();
router.post('/', getPuntosInteresCercanos);
router.get('/', getTotalUsuarios);
export default router;