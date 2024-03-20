import { Router } from "express";
import { getSolicitudesGneral } from "../../controllers/details/solicitudes";
const router = Router();
router.get('/', getSolicitudesGneral);
export default router;