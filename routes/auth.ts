import { Router } from "express";
import { login, restablcerContrasena } from "../controllers/auth";
import { check } from "express-validator";



const router = Router();

router.post('/login', [
    check('usu_email', 'El correo es obligatorio').isEmail(),
    check('usu_contra', 'La contraseña es obligatoria').not().isEmpty()
], login);
router.post('/reset', [
    check('usu_email', 'El correo es obligatorio').isEmail(),
],restablcerContrasena);

export default router;