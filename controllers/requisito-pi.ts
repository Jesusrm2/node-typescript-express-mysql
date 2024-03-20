import { Request, Response } from "express";
import { validationResult } from "express-validator";
import RequerimientoPi from "../models/requisito-pi";

interface CustomRequest extends Request {
    req_id?: string;
  }

export const getRequerimientosPi = async (req: Request, res:Response)=>{
    const RequerimientoPis = await RequerimientoPi.findAll();
    res.json({RequerimientoPis});
}

export const getRequerimientoPi = async (req:CustomRequest, res:Response)=>{
    const {req_id} = req.params;
    const requerimientoPi = await RequerimientoPi.findByPk(req_id);
    if(requerimientoPi){
        res.json({requerimientoPi});
    }else{
        res.status(404).json({
            msg: `No existe un Requerimiento de Punto Interes con la id ${req_id}`
        })
    }
}

export const postRequerimientoPi = async (req: Request, res:Response)=>{
    const {body} = req;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    try {
        const requerimientoPi = new RequerimientoPi(body);
        await requerimientoPi.save();
        res.json(requerimientoPi);
    } catch (error) {
        console.log(error);
        console.log('este es ', body)
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}

export const putRequerimientoPi = async (req: Request, res:Response)=>{
    const {req_id} = req.params;
    const {body} = req;
    try {
        const requerimientoPi = await RequerimientoPi.findByPk(req_id);
        if(!requerimientoPi){
            return res.status(400).json({
                msg: 'No existe un Requerimiento de Punto Punto Interes con el id' + body.req_id
            });
        }
        await requerimientoPi.update(body);
        res.json(requerimientoPi);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}
export const deleteRequerimientoPi = (req: Request, res:Response)=>{
    const {req_id} = req.params;
    res.json({
        msg:'delete Requerimiento Pi',
        req_id
    })
}