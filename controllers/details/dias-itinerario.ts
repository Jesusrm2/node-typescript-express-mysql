import { Request, Response } from "express";
import db from "../../db/conexion";
import { QueryTypes } from "sequelize";

interface CustomRequest extends Request {
    iti_id?: string;
}

export const getItinerarioDia = async (req: CustomRequest, res: Response) => {
  const { iti_id } = req.params;
  try {
    const sql = `
    SELECT iti_dia_id, iti_dia_num, iti_dia_fecha
    FROM tb_itinerario_dias
    WHERE iti_id = :iti_id
    `;
    const results = await db.query(sql, {
      replacements: { iti_id },
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
