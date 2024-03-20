import { Router } from "express";
import { getItinerarioPer } from "../../controllers/details/itinerarios";

const router = Router();
router.get('/:per_id', getItinerarioPer);
export default router;