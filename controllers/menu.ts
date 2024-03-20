import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Menu from "../models/menu";

interface CustomRequest extends Request {
    men_id?: string;
  }

export const getMenus = async (req: Request, res:Response)=>{
    const menus = await Menu.findAll();
    res.json({menus});
}

export const getMenu = async (req:CustomRequest, res:Response)=>{
    const {men_id} = req.params;
    const menu = await Menu.findByPk(men_id);
    if(menu){
        res.json({menu});
    }else{
        res.status(404).json({
            msg: `No existe un Menu con la id ${men_id}`
        })
    }
}

export const postMenu = async (req: Request, res:Response)=>{
    const {body} = req;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    try {
        const menu = new Menu(body);
        await menu.save();
        res.json(menu);
    } catch (error) {
        console.log(error);
        console.log('este es ', body)
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}

export const putMenu = async (req: Request, res:Response)=>{
    const {men_id} = req.params;
    const {body} = req;
    try {
        const menu = await Menu.findByPk(men_id);
        if(!menu){
            return res.status(400).json({
                msg: 'No existe un Menu con el id' + body.men_id
            });
        }
        await menu.update(body);
        res.json(menu);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}
export const deleteMenu = (req: Request, res:Response)=>{
    const {men_id} = req.params;
    res.json({
        msg:'delete Solicitud punto de interes',
        men_id
    })
}