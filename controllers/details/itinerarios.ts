import { Request, Response } from "express";
import db from "../../db/conexion";
import { QueryTypes } from "sequelize";

interface CustomRequest extends Request {
  pi_soli_id?: string;
}

export const getItinerarioPer = async (req: CustomRequest, res: Response) => {
  const { per_id } = req.params;
  try {
    const sql = `
    SELECT *
    FROM tb_itinerarios
    WHERE per_id = :per_id
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
