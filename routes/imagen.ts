import { Router } from "express";
import { deleteImagen, getImagen, getImagens, postImagen, putImagen } from "../controllers/imagen";

const router = Router();


router.get('/', getImagens);
router.get('/:img_id', getImagen);
router.post('/', postImagen);
router.put('/:img_id', putImagen);
router.delete('/:img_id', deleteImagen);


export default router;