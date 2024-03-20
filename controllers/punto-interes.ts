import { Request, Response } from "express";
import { validationResult } from "express-validator";
import PuntoInteres from "../models/punto-interes";

interface CustomRequest extends Request {
    pi_id?: string;
  }

export const getPuntosIntereses = async (req: Request, res:Response)=>{
    const puntoInteress = await PuntoInteres.findAll();
    res.json({puntoInteress});
}

export const getPuntoInteres = async (req:CustomRequest, res:Response)=>{
    const {pi_id} = req.params;
    const puntoInteres = await PuntoInteres.findByPk(pi_id);
    if(puntoInteres){
        res.json({puntoInteres});
    }else{
        res.status(404).json({
            msg: `No existe un Punto Interes con la id ${pi_id}`
        })
    }
}

export const postPuntoInteres = async (req: Request, res:Response)=>{
    const {body} = req;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    try {
        const existePlaceId = await PuntoInteres.findOne({
            where:{
                pi_place_id: body.pi_place_id
            }
        });
        if(existePlaceId){
            return res.status(400).json({
                pi_id: existePlaceId.pi_id,
                msg: 'Ya existe el lugar registrado ' + body.pi_place_id
            });
        }
        const puntoInteres = new PuntoInteres(body);
        await puntoInteres.save();
        res.json(puntoInteres);
    } catch (error) {
        console.log(error);
        console.log('este es ', body)
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}

export const putPuntoInteres = async (req: Request, res:Response)=>{
    const {pi_id} = req.params;
    const {body} = req;
    try {
        const puntoInteres = await PuntoInteres.findByPk(pi_id);
        if(!puntoInteres){
            return res.status(400).json({
                msg: 'No existe un Punto Interes con el id' + body.pi_id
            });
        }
        await puntoInteres.update(body);
        res.json(puntoInteres);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}
export const deletePuntoInteres = (req: Request, res:Response)=>{
    const {pi_id} = req.params;
    res.json({
        msg:'delete PuntoInteres',
        pi_id
    })
}