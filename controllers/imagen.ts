import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Imagen from "../models/imagen";

interface CustomRequest extends Request {
    img_id?: string;
  }

export const getImagens = async (req: Request, res:Response)=>{
    const imagens = await Imagen.findAll();
    res.json({imagens});
}

export const getImagen = async (req:CustomRequest, res:Response)=>{
    const {img_id} = req.params;
    const imagen = await Imagen.findByPk(img_id);
    if(imagen){
        res.json({imagen});
    }else{
        res.status(404).json({
            msg: `No existe un Imagen con la id ${img_id}`
        })
    }
}

export const postImagen = async (req: Request, res:Response)=>{
    const {body} = req;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    try {
        const imagen = new Imagen(body);
        await imagen.save();
        res.json(imagen);
    } catch (error) {
        console.log(error);
        console.log('este es ', body)
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}

export const putImagen = async (req: Request, res:Response)=>{
    const {img_id} = req.params;
    const {body} = req;
    try {
        const imagen = await Imagen.findByPk(img_id);
        if(!imagen){
            return res.status(400).json({
                msg: 'No existe un Imagen con el id' + body.img_id
            });
        }
        await imagen.update(body);
        res.json(imagen);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}
export const deleteImagen = (req: Request, res:Response)=>{
    const {img_id} = req.params;
    res.json({
        msg:'delete Imagen',
        img_id
    })
}