import { Request, Response } from "express";
import Persona from "../models/persona";
export const getPersonas = async (req: Request, res:Response)=>{
    const persona = await Persona.findAll();
    res.json({persona});
}

export const getPersona = async (req: Request, res:Response)=>{
    const {per_id} = req.params;
    const persona = await Persona.findByPk(per_id);
    if(persona){
        res.json(persona);
    }else{
        res.status(404).json({
            msg: `No existe un persona con la id ${per_id}`
        })
    }
    
}
export const postPersona = async (req: Request, res:Response)=>{
    const {body} = req;
    try {
        const persona = new Persona(body);
        await persona.save();
        res.json(persona);
    } catch (error) {
        console.log(error);
        console.log('este es ', body)
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}

export const putPersona = async (req: Request, res:Response)=>{
    const {per_id} = req.params;
    const {body} = req;
    try {
        const persona = await Persona.findByPk(per_id);
        if(!persona){
            return res.status(400).json({
                msg: 'No existe un persona con el id' + body.per_id
            });
        }

        await persona.update(body);
        res.json(persona);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}
export const deletePersona = (req: Request, res:Response)=>{
    const {per_id} = req.params;
    res.json({
        msg:'delete persona',
        per_id
    })
}