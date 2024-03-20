import { Router } from "express";
import { buscarLugar, buscarLugares, genenralCalicacionesLugar } from "../../controllers/admin/lugares-calificaciones";

const router = Router();
router.post('/', genenralCalicacionesLugar);
router.get('/:nombre', buscarLugar);
router.get('/', buscarLugares);
export default router;