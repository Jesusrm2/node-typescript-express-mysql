import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Usuario from "../models/usuario";
import  bcryptjs  from "bcryptjs";
import nodemailer from "nodemailer";
import { generarJWT } from "../helpers/generar-jwt";

export const login = async (req: Request, res:Response)=>{
    
    const {usu_email, usu_contra} = req.body;
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    try {
        //Verificar si el email existe
        const usuario = await Usuario.findOne(({
            where:{
                usu_email: req.body.usu_email
            }
        }));
        if (!usuario) {
            return res.status(400).json({
                msg:"Usuario / Password no son correctos - correo"
            })
        }
        if (usuario.usu_estado == "I") {
            return res.status(400).json({
                msg:"Usuario / Password no son correctos - estado = inactivo"
            })
        }
        //Verificar contrasenia
        const validPassword = bcryptjs.compareSync(usu_contra,usuario.usu_contra)
        if (!validPassword){
            return res.status(400).json({
                msg:"Usuario / Password no son correctos - password"
            })
        }
        // Generar el JWT 
        const token = await generarJWT(usuario.id_user, usuario.per_id, usuario.rol_id);

        res.json({
            msg: 'Login ok',
            usuario, token
        })
        
       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el administrador',
        })
    }
}

export const restablcerContrasena = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    try {
        const { usu_email} = req.body;
        // generar contraseña aleatoria
        const contrasena = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const busUser = await Usuario.findOne({
            where: {
                usu_email
            },
            attributes: [
                'id_user',
                'usu_email'
            ]
        });

        if (!busUser) {
            return res.status(404).json({
                msg: 'Usuario no encontrado'
            })
        }
        else {
            //    actualizar usuario
            await Usuario.update({
                usu_contra: bcryptjs.hashSync(contrasena, 10)
            }, {
                where: {
                    id_user: busUser.id_user
                }
            });
            // enviar correo con la nueva contraseña
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'jesusrm3105@gmail.com',
                    pass: 'mrszkipypwsqszej'
                }
            });
            const mailOptions = {
                from: 'jesusmald.23@gmail.com',
                to: busUser.usu_email,
                subject: 'Sistema de generación de itinerarios turisticos',
                text: 'Estimado usuario se ha atendiendo a su solicitud se le ha generado una nueva contraseña para el ingreso al sistema, su nueva contraseña es: '+contrasena
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('email sent: ' + info.response);
                }
            });
            res.json({
                msg: 'el usuario fue actualizado'
            })


        }
    } catch (error) {
        console.log(error)
    }
}