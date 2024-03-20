import { Request, Response } from "express";
import { validationResult } from "express-validator";
import PiItinerario from "../models/itineraio-dia";

interface CustomRequest extends Request {
    iti_dia_id?: string;
  }

export const getPiItinerarios = async (req: Request, res:Response)=>{
    const diaItinerario = await PiItinerario.findAll();
    res.json({diaItinerario});
}

export const getPiItinerario = async (req:CustomRequest, res:Response)=>{
    const {iti_dia_id} = req.params;
    const diaItinerario = await PiItinerario.findByPk(iti_dia_id);
    if(diaItinerario){
        res.json({diaItinerario});
    }else{
        res.status(404).json({
            msg: `No existe un dia con la id ${iti_dia_id}`
        })
    }
}

export const postPiItinerario = async (req: Request, res:Response)=>{
    const {body} = req;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    try {
        const diaItinerario = new PiItinerario(body);
        await diaItinerario.save();
        res.json(diaItinerario);
    } catch (error) {
        console.log(error);
        console.log('este es ', body)
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}

export const putPiItinerario = async (req: Request, res:Response)=>{
    const {iti_dia_id} = req.params;
    const {body} = req;
    try {
        const piItinerario = await PiItinerario.findByPk(iti_dia_id);
        if(!piItinerario){
            return res.status(400).json({
                msg: 'No existe un dia con el id' + body.iti_dia_id
            });
        }
        await piItinerario.update(body);
        res.json(piItinerario);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}
export const deletePiItinerario = (req: Request, res:Response)=>{
    const {iti_dia_id} = req.params;
    res.json({
        msg:'delete dia',
        iti_dia_id
    })
}