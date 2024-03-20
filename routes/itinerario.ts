import { Router } from "express";
import { deleteItinerario, getItinerarios, postItinerario, putItinerario } from "../controllers/itinerario";

const router = Router();

router.get('/', getItinerarios);
router.get('/:iti_id', getItinerarios);
router.post('/', postItinerario);
router.put('/:iti_id', putItinerario);
router.delete('/:iti_id', deleteItinerario);


export default router;