import { Router } from "express";
import { deleteCategoria, getCategoria, getCategorias, postCategoria, putCategoria } from "../controllers/categoria";
const router = Router();

router.get('/', getCategorias);
router.get('/:cat_id', getCategoria);
router.post('/', postCategoria);
router.put('/:cat_id', putCategoria);
router.delete('/:cat_id', deleteCategoria);


export default router;