import { Router } from "express";

import { getVisitasFecha } from "../../controllers/details/visitas-fecha";

const router = Router();
router.post('/', getVisitasFecha);
export default router;