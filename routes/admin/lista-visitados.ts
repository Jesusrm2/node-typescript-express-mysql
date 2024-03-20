import { Router } from "express";
import { listaMasMenosVisitados } from "../../controllers/admin/lista-visitados";

const router = Router();
router.post('/', listaMasMenosVisitados);
export default router;