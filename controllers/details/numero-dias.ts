import { Request, Response } from "express";
import db from "../../db/conexion";
import { QueryTypes } from "sequelize";

interface CustomRequest extends Request {
    per_id?: string;
}

export const getNumDias= async (req: CustomRequest, res: Response) => {
  const { per_id } = req.params;
  try {
    const sql = `
    SELECT COUNT(*) AS numero_dias
    FROM tb_itinerario_dias
    INNER JOIN tb_itinerarios ON tb_itinerario_dias.iti_id = tb_itinerarios.iti_id
    WHERE tb_itinerarios.per_id = :per_id
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
