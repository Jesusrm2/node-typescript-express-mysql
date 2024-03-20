import { Router } from "express";
import { getRol, getRoles, postRol } from "../controllers/rol";

const router = Router();

router.get('/', getRoles);
router.get('/:rol_id', getRol);
router.post('/', postRol);


export default router;