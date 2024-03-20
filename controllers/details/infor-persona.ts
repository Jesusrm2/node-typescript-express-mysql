import { Request, Response } from "express";
import db from "../../db/conexion";
import { QueryTypes } from "sequelize";

interface CustomRequest extends Request {
    per_id?: string;
}

export const infoPersona = async (req: CustomRequest, res: Response) => {
  const { per_id } = req.params;
  try {
    const sql = `
    SELECT u.usu_email,u.usu_contra, p.per_id, p.per_nombres, p.per_apellidos, p.per_cel, p.per_estado
    FROM tb_usuarios u
    JOIN tb_personas p ON u.per_id = p.per_id
    WHERE p.per_id = :per_id;
    
    `;
    const results = await db.query(sql, {
      replacements: { per_id },
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
