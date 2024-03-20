import { Request, Response } from "express";
import { validationResult } from "express-validator";
import PiCategoria from "../models/pi-categoria";

interface CustomRequest extends Request {
    pi_cat_id?: string;
  }

export const getpiCategorias = async (req: Request, res:Response)=>{
    const piCategoria = await PiCategoria.findAll();
    res.json({piCategoria});
}

export const getpiCategoria = async (req:CustomRequest, res:Response)=>{
    const {pi_cat_id} = req.params;
    const piCategoria = await PiCategoria.findByPk(pi_cat_id);
    if(piCategoria){
        res.json({piCategoria});
    }else{
        res.status(404).json({
            msg: `No existe un pi categoria con la id ${pi_cat_id}`
        })
    }
}

export const postpiCategoria = async (req: Request, res:Response)=>{
    const {body} = req;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    try {
        const piCategoria = new PiCategoria(body);
        await piCategoria.save();
        res.json(piCategoria);
    } catch (error) {
        console.log(error);
        console.log('este es ', body)
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}

export const putpiCategoria = async (req: Request, res:Response)=>{
    const {pi_cat_id} = req.params;
    const {body} = req;
    try {
        const piCategoria = await PiCategoria.findByPk(pi_cat_id);
        if(!piCategoria){
            return res.status(400).json({
                msg: 'No existe un pi categoria con el id' + body.pi_cat_id
            });
        }
        await piCategoria.update(body);
        res.json(piCategoria);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}
export const deletepiCategoria  = (req: Request, res:Response)=>{
    const {pi_cat_id} = req.params;
    res.json({
        msg:'delete piCalificacion',
        pi_cat_id
    })
}