import { Router } from "express";
import { deleteDiaHora, getDiaHora, getDiaHoras, postDiaHora, putDiaHora } from "../controllers/dia-hora";

const router = Router();

router.get('/', getDiaHoras);
router.get('/:dia_hora_id', getDiaHora);
router.post('/', postDiaHora);
router.put('/:dia_hora_id', putDiaHora);
router.delete('/:dia_hora_id', deleteDiaHora);


export default router;