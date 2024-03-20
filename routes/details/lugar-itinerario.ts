import { Router } from "express";
import { getItinerarioLugar } from "../../controllers/details/lugar-itinerario";

const router = Router();
router.get('/:pi_id', getItinerarioLugar);
export default router;