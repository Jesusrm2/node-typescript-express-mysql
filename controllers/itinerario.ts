import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Itinerario from "../models/itinerario";

interface CustomRequest extends Request {
    iti_id?: string;
  }

export const getItinerarios = async (req: Request, res:Response)=>{
    const itinerarios = await Itinerario.findAll();
    res.json({itinerarios});
}

export const getItinerario = async (req:CustomRequest, res:Response)=>{
    const {iti_id} = req.params;
    const itinerario = await Itinerario.findByPk(iti_id);
    if(itinerario){
        res.json({itinerario});
    }else{
        res.status(404).json({
            msg: `No existe un Itinerario con la id ${iti_id}`
        })
    }
}

export const postItinerario = async (req: Request, res:Response)=>{
    const {body} = req;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    try {
        const itinerario = new Itinerario(body);
        await itinerario.save();
        res.json(itinerario);
    } catch (error) {
        console.log(error);
        console.log('este es ', body)
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}

export const putItinerario = async (req: Request, res:Response)=>{
    const {iti_id} = req.params;
    const {body} = req;
    try {
        const itinerario = await Itinerario.findByPk(iti_id);
        if(!itinerario){
            return res.status(400).json({
                msg: 'No existe un Itinerario con el id' + body.iti_id
            });
        }
        await itinerario.update(body);
        res.json(itinerario);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}
export const deleteItinerario = (req: Request, res:Response)=>{
    const {iti_id} = req.params;
    res.json({
        msg:'delete Itinerario',
        iti_id
    })
}