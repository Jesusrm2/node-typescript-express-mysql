import { Router } from "express";
import { deletepiCategoria, getpiCategoria, getpiCategorias, postpiCategoria, putpiCategoria } from "../controllers/pi-categoria";

const router = Router();


router.get('/', getpiCategorias);
router.get('/:pi_cat_id', getpiCategoria);
router.post('/', postpiCategoria);
router.put('/:pi_cat_id', putpiCategoria);
router.delete('/:pi_cat_id', deletepiCategoria);


export default router;