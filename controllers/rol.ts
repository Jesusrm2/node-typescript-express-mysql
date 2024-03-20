import { Request, Response } from "express";
import Rol from "../models/rol";

export const getRoles = async (req: Request, res:Response)=>{
    const roles = await Rol.findAll();
    res.json({roles});
}

export const getRol = async (req: Request, res:Response)=>{
    const {rol_id} = req.params;
    const roles = await Rol.findByPk(rol_id);
    if(roles){
        res.json(roles);
    }else{
        res.status(404).json({
            msg: `No existe un rol con la id ${rol_id}`
        })
    }
    
}
export const postRol = async (req: Request, res:Response)=>{
    const {body} = req;
    try {
        const rol = new Rol(body);
        await rol.save();
        res.json(rol);
    } catch (error) {
        console.log(error);
        console.log('este es ', body)
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}

