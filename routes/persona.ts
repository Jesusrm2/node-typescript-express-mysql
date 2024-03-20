import { Router } from "express";
import { deletePersona, getPersona, getPersonas, postPersona, putPersona } from "../controllers/persona";

const router = Router();

router.get('/', getPersonas);
router.get('/:per_id', getPersona);
router.post('/', postPersona);
router.put('/:per_id', putPersona);
router.delete('/:per_id', deletePersona);


export default router;