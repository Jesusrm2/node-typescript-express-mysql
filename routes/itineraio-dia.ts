import { Router } from "express";
import { deletePiItinerario, getPiItinerario, getPiItinerarios, postPiItinerario, putPiItinerario } from "../controllers/itineraio-dia";

const router = Router();

router.get('/', getPiItinerarios);
router.get('/:iti_dia_id', getPiItinerario);
router.post('/', postPiItinerario);
router.put('/:iti_dia_id', putPiItinerario);
router.delete('/:iti_dia_id', deletePiItinerario);


export default router;