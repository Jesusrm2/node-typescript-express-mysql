import { Request, Response } from "express";
import db from "../../db/conexion";
import { QueryTypes } from "sequelize";

interface CustomRequest extends Request {
    pi_id?: string;
}

export const comentariosUnLugar = async (req: CustomRequest, res: Response) => {
  const { pi_id } = req.params;
  try {
    const sql = `
    SELECT
    pi.pi_id,
    pi.pi_nombre,
    cal.cal_puntuacion,
    cal.cal_comentario,
    persona.per_id,
    persona.per_nombres,
    persona.per_apellidos,
    usuario.usu_email
  FROM tb_puntos_interes AS pi
  LEFT JOIN tb_calificaciones AS cal ON pi.pi_id = cal.pi_id
  LEFT JOIN tb_personas AS persona ON cal.per_id = persona.per_id
  LEFT JOIN tb_usuarios AS usuario ON persona.per_id = usuario.per_id
  WHERE pi.pi_id =  :pi_id

    `;
    const results = await db.query(sql, {
      replacements: { pi_id },
      type: QueryTypes.SELECT,
    });
    res.json(results);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error en el servidor',
    });
  }
};
