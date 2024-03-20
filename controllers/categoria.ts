import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Categoria from "../models/categoria";

interface CustomRequest extends Request {
    cat_id?: string;
  }

export const getCategorias = async (req: Request, res:Response)=>{
    const Categorias = await Categoria.findAll();
    res.json({Categorias});
}

export const getCategoria = async (req:CustomRequest, res:Response)=>{
    const {cat_id} = req.params;
    const categoria = await Categoria.findByPk(cat_id);
    if(categoria){
        res.json({categoria});
    }else{
        res.status(404).json({
            msg: `No existe un Categoria con la id ${cat_id}`
        })
    }
}

export const postCategoria = async (req: Request, res:Response)=>{
    const {body} = req;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    try {
        const categoria = new Categoria(body);
        await categoria.save();
        res.json(categoria);
    } catch (error) {
        console.log(error);
        console.log('este es ', body)
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}

export const putCategoria = async (req: Request, res:Response)=>{
    const {cat_id} = req.params;
    const {body} = req;
    try {
        const categoria = await Categoria.findByPk(cat_id);
        if(!categoria){
            return res.status(400).json({
                msg: 'No existe un Categoria con el id' + body.cat_id
            });
        }
        await categoria.update(body);
        res.json(categoria);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}
export const deleteCategoria = (req: Request, res:Response)=>{
    const {cat_id} = req.params;
    res.json({
        msg:'delete Categoria',
        cat_id
    })
}