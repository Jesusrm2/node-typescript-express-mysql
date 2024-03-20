import { Router } from "express";
import { deleteRequerimientoPi, getRequerimientoPi, getRequerimientosPi, postRequerimientoPi, putRequerimientoPi } from "../controllers/requisito-pi";


const router = Router();

router.get('/', getRequerimientosPi);
router.get('/:req_id', getRequerimientoPi);
router.post('/',postRequerimientoPi);
router.put('/:req_id',putRequerimientoPi);
router.delete('/:req_id',deleteRequerimientoPi);


export default router;