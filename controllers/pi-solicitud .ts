import { Request, Response } from "express";
import { validationResult } from "express-validator";
import PiSolicitud from "../models/pi-solicitud";

interface CustomRequest extends Request {
    pi_soli_id?: string;
  }

export const getPiSolicitudes = async (req: Request, res:Response)=>{
    const piSolicitudes = await PiSolicitud.findAll();
    res.json({piSolicitudes});
}

export const getPiSolicitud = async (req:CustomRequest, res:Response)=>{
    const {pi_soli_id} = req.params;
    const piSolicitud = await PiSolicitud.findByPk(pi_soli_id);
    if(piSolicitud){
        res.json({piSolicitud});
    }else{
        res.status(404).json({
            msg: `No existe un Solicitud de punto de interes con la id ${pi_soli_id}`
        })
    }
}

export const postPiSolicitud = async (req: Request, res:Response)=>{
    const {body} = req;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    try {
        const piSolicitud = new PiSolicitud(body);
        await piSolicitud.save();
        res.json(piSolicitud);
    } catch (error) {
        console.log(error);
        console.log('este es ', body)
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}

export const putPiSolicitud = async (req: Request, res:Response)=>{
    const {pi_soli_id} = req.params;
    const {body} = req;
    try {
        const piSolicitud = await PiSolicitud.findByPk(pi_soli_id);
        if(!piSolicitud){
            return res.status(400).json({
                msg: 'No existe un Solicitud de punto de interes con el id' + body.pi_soli_id
            });
        }
        await piSolicitud.update(body);
        res.json(piSolicitud);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}
export const deletePiSolicitud = (req: Request, res:Response)=>{
    const {pi_soli_id} = req.params;
    res.json({
        msg:'delete Solicitud punto de interes',
        pi_soli_id
    })
}