import { Router } from "express";
import { getItinerarioDia } from "../../controllers/details/dias-itinerario";


const router = Router();
router.get('/:iti_id', getItinerarioDia);
export default router;