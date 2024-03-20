import { Request, Response } from "express";
import { validationResult } from "express-validator";
import DiaHora from "../models/dia-hora";

interface CustomRequest extends Request {
    dia_hora_id?: string;
  }

export const getDiaHoras = async (req: Request, res:Response)=>{
    const diaHoras = await DiaHora.findAll();
    res.json({diaHoras});
}

export const getDiaHora = async (req:CustomRequest, res:Response)=>{
    const {dia_hora_id} = req.params;
    const diaHora = await DiaHora.findByPk(dia_hora_id);
    if(diaHora){
        res.json({diaHora});
    }else{
        res.status(404).json({
            msg: `No existe una Hora con la id ${dia_hora_id}`
        })
    }
}

export const postDiaHora = async (req: Request, res:Response)=>{
    const {body} = req;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    try {
        const diaHora = new DiaHora(body);
        await diaHora.save();
        res.json(diaHora);
    } catch (error) {
        console.log(error);
        console.log('este es ', body)
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}

export const putDiaHora = async (req: Request, res:Response)=>{
    const {dia_hora_id} = req.params;
    const {body} = req;
    try {
        const diaHora = await DiaHora.findByPk(dia_hora_id);
        if(!diaHora){
            return res.status(400).json({
                msg: 'No existe una Hora con el id' + body.dia_hora_id
            });
        }
        await diaHora.update(body);
        res.json(diaHora);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}
export const deleteDiaHora = (req: Request, res:Response)=>{
    const {dia_hora_id} = req.params;
    res.json({
        msg:'delete Dia Hora',
        dia_hora_id
    })
}