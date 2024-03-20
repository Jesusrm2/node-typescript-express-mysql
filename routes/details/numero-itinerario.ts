import { Router } from "express";
import { getNumItinerario, getNumItinerarioGeneral } from "../../controllers/details/numero-itinerario";

const router = Router();
router.get('/:per_id', getNumItinerario);
router.get('/', getNumItinerarioGeneral);
export default router;