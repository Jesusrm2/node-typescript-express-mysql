import { Router } from "express";
import { deletePuntoInteres, getPuntoInteres, getPuntosIntereses, postPuntoInteres, putPuntoInteres } from "../controllers/punto-interes";


const router = Router();

router.get('/', getPuntosIntereses);
router.get('/:pi_id', getPuntoInteres);
router.post('/',postPuntoInteres);
router.put('/:pi_id',putPuntoInteres);
router.delete('/:pi_id',deletePuntoInteres);


export default router;