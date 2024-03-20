import { Router } from "express";
import { deleteHoraPi, getHoraPi, getHoraPis, postHoraPi, putHoraPi } from "../controllers/hora-pi";

const router = Router();


router.get('/', getHoraPis);
router.get('/:hora_pi_id', getHoraPi);
router.post('/', postHoraPi);
router.put('/:hora_pi_id', putHoraPi);
router.delete('/:hora_pi_id', deleteHoraPi);


export default router;