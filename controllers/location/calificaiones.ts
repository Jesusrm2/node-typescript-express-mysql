import { Request, Response } from "express";
import db from "../../db/conexion";
import { QueryTypes } from "sequelize";

interface CustomRequest extends Request {
    pi_id?: string;
}

export const calificacionesGeneralLugar= async (req: CustomRequest, res: Response) => {
  const { pi_id } = req.params;
  try {
    const sql = `
    SELECT
    pi.pi_id,
    pi.pi_nombre,
    COUNT(CASE WHEN cal.cal_puntuacion = 5 THEN 1 END) AS calificaciones_5,
    COUNT(CASE WHEN cal.cal_puntuacion = 4 THEN 1 END) AS calificaciones_4,
    COUNT(CASE WHEN cal.cal_puntuacion = 3 THEN 1 END) AS calificaciones_3,
    COUNT(CASE WHEN cal.cal_puntuacion = 2 THEN 1 END) AS calificaciones_2,
    COUNT(CASE WHEN cal.cal_puntuacion = 1 THEN 1 END) AS calificaciones_1,
    COUNT(cal.cal_puntuacion) AS total_calificaciones,
    ROUND(AVG(cal.cal_puntuacion), 2) AS promedio_general_calificaciones
  FROM tb_puntos_interes AS pi
  LEFT JOIN tb_calificaciones AS cal ON pi.pi_id = cal.pi_id
  WHERE pi.pi_id =  :pi_id
  GROUP BY pi.pi_id, pi.pi_nombre;

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
