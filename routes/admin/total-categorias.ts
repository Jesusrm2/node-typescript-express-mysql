import { Router } from "express";
import { getTotalesCategorias, totalesCategoriasFecha } from "../../controllers/admin/total-categorias";


const router = Router();
router.get('/', getTotalesCategorias);
router.post('/', totalesCategoriasFecha);
export default router;