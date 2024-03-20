import { Request, Response } from "express";
import { validationResult } from "express-validator";
import HoraPi from "../models/hora-pi";

interface CustomRequest extends Request {
    hora_pi_id?: string;
  }

export const getHoraPis = async (req: Request, res:Response)=>{
    const horaPis = await HoraPi.findAll();
    res.json({horaPis});
}

export const getHoraPi = async (req:CustomRequest, res:Response)=>{
    const {hora_pi_id} = req.params;
    const horaPi = await HoraPi.findByPk(hora_pi_id);
    if(horaPi){
        res.json({horaPi});
    }else{
        res.status(404).json({
            msg: `No existe un Hora Pi con la id ${hora_pi_id}`
        })
    }
}

export const postHoraPi = async (req: Request, res:Response)=>{
    const {body} = req;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    try {
        const horaPi = new HoraPi(body);
        await horaPi.save();
        res.json(horaPi);
    } catch (error) {
        console.log(error);
        console.log('este es ', body)
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}

export const putHoraPi = async (req: Request, res:Response)=>{
    const {hora_pi_id} = req.params;
    const {body} = req;
    try {
        const horaPi = await HoraPi.findByPk(hora_pi_id);
        if(!horaPi){
            return res.status(400).json({
                msg: 'No existe un Hora Pi con el id' + body.hora_pi_id
            });
        }
        await horaPi.update(body);
        res.json(horaPi);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}
export const deleteHoraPi = (req: Request, res:Response)=>{
    const {hora_pi_id} = req.params;
    res.json({
        msg:'delete Hora Pi',
        hora_pi_id
    })
}