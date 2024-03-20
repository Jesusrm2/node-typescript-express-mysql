import { Router } from "express";
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from "../controllers/usuario";
import { check } from "express-validator";
import validarJWT from "../middlewares/validar-jwt";


const router = Router();

router.get('/', getUsuarios);
router.get('/:id_user', getUsuario);
//,[ validarJWT]
router.post('/', [
    
    check('usu_email', 'El correo no es válido').isEmail(),

],postUsuario);
router.put('/:id_user', putUsuario);
router.delete('/:id_user', deleteUsuario);




export default router;