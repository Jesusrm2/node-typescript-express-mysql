import { Request, Response } from "express";
import db from "../../db/conexion";
import { QueryTypes } from "sequelize";

interface CustomRequest extends Request {
    per_id?: string;
}

export const getNumMin = async (req: CustomRequest, res: Response) => {
  const { per_id } = req.params;
  try {
    const sql = `
    SELECT SUM(minutos) AS total_minutos
    FROM tb_dia_horas
    INNER JOIN tb_itinerario_dias ON tb_dia_horas.iti_dia_id = tb_itinerario_dias.iti_dia_id
    INNER JOIN tb_itinerarios ON tb_itinerario_dias.iti_id = tb_itinerarios.iti_id
    WHERE tb_itinerarios.per_id =:per_id
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
