import { Request, Response } from "express";
import Usuario from "../models/usuario";
import  bcryptjs  from "bcryptjs";
import { validationResult } from "express-validator";

interface CustomRequest extends Request {
    id_user?: string;
  }

export const getUsuarios = async (req: Request, res:Response)=>{
    const usuarios = await Usuario.findAll();
    res.json({usuarios});
}

export const getUsuario = async (req:CustomRequest, res:Response)=>{
    const {id_user} = req.params;
 //   const uid = req.id_user
    const usuario = await Usuario.findByPk(id_user);
    if(usuario){
        res.json({usuario});
    }else{
        res.status(404).json({
            msg: `No existe un usuario con la id ${id_user}`
        })
    }
    
}


export const postUsuario = async (req: Request, res:Response)=>{
    const {body} = req;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    try {
        const existeEmail = await Usuario.findOne({
            where:{
                usu_email: body.usu_email
            }
        });
        if(existeEmail){
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ' + body.usu_email
            });
        }
        //Encriptar la contrasenia
        const salt = bcryptjs.genSaltSync(10);
        const contra = bcryptjs.hashSync(body.usu_contra, salt);
        body.usu_contra=contra;


        const usuario = new Usuario(body);
        await usuario.save();
        res.json(usuario);
    } catch (error) {
        console.log(error);
        console.log('este es ', body)
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}

export const putUsuario = async (req: Request, res:Response)=>{
    const {id_user} = req.params;
    const {body} = req;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    try {
        const usuario = await Usuario.findByPk(id_user);
        if(!usuario){
            return res.status(400).json({
                msg: 'No existe un usuario con el id' + body.id_user
            });
        }
        const existeEmail = await Usuario.findOne({
            where:{
                usu_email: body.usu_email
            }
        });
        if(existeEmail){
            return res.status(400).json({
                msg: 'Ya existe un usuario con el email ' + body.usu_email
            });
        }
        //Encriptar la contrasenia
        const salt = bcryptjs.genSaltSync(10);
        const contra = bcryptjs.hashSync(body.usu_contra, salt);
        body.usu_contra=contra;


        await usuario.update(body);
        res.json(usuario);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}
export const deleteUsuario = (req: Request, res:Response)=>{
    const {id_user} = req.params;
    res.json({
        msg:'delete usuario',
        id_user
    })
}