import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Calificacion from "../models/calificacion";

interface CustomRequest extends Request {
    cal_id?: string;
  }

export const getcalificacions = async (req: Request, res:Response)=>{
    const calificacions = await Calificacion.findAll();
    res.json({calificacions});
}

export const getcalificacion = async (req:CustomRequest, res:Response)=>{
    const {cal_id} = req.params;
    const calificacion = await Calificacion.findByPk(cal_id);
    if(calificacion){
        res.json({calificacion});
    }else{
        res.status(404).json({
            msg: `No existe un calificacion con la id ${cal_id}`
        })
    }
}

export const postcalificacion = async (req: Request, res:Response)=>{
    const {body} = req;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    try {
        const calificacion = new Calificacion(body);
        await calificacion.save();
        res.json(calificacion);
    } catch (error) {
        console.log(error);
        console.log('este es ', body)
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}

export const putcalificacion = async (req: Request, res:Response)=>{
    const {cal_id} = req.params;
    const {body} = req;
    try {
        const calificacion = await Calificacion.findByPk(cal_id);
        if(!calificacion){
            return res.status(400).json({
                msg: 'No existe un calificacion con el id' + body.cal_id
            });
        }
        await calificacion.update(body);
        res.json(calificacion);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}
export const deletecalificacion = (req: Request, res:Response)=>{
    const {cal_id} = req.params;
    res.json({
        msg:'delete calificacion',
        cal_id
    })
}