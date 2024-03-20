import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario';

interface CustomRequest extends Request {
    id_user?: string;
  }


const validarJWT = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header('x-token');
  if (!token) {
    res.status(401).json({
      msg: 'No hay token en la petición',
    });
    return;
  }

  try {
    const { id_user } = jwt.verify(token, process.env.SECRETORPTIVATEKEY as string) as { id_user: string };

    const usuario = await Usuario.findByPk(id_user);

    if(!usuario){
        res.status(401).json({
            msg: 'Token no válido - usuario no existe en bd',
          });
          return;
    }

    if(usuario.usu_estado == "I"){
        res.status(401).json({
            msg: 'Token no válido - usuario con estado: Inactivo',
          });
          return;
    }

    req.id_user = id_user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token no válido',
    });
  }
};

export default validarJWT;
