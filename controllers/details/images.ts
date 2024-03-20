import { Request, Response } from "express";
import db from "../../db/conexion";
import { QueryTypes } from "sequelize";

interface CustomRequest extends Request {
    pi_id?: string;
}

export const getImagenes = async (req: CustomRequest, res: Response) => {
  const { pi_id } = req.params;
  try {
    const sql = `
    SELECT DISTINCT i.img_id, i.img_url
    FROM tb_imagenes i
    WHERE i.pi_id =:pi_id
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
