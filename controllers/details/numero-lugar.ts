import { Request, Response } from "express";
import db from "../../db/conexion";
import { QueryTypes } from "sequelize";

interface CustomRequest extends Request {
    per_id?: string;
}

export const getNumLugares = async (req: CustomRequest, res: Response) => {
  const { per_id } = req.params;
  try {
    const sql = `
    SELECT COUNT(*) AS num_lugares
    FROM tb_dia_horas
    INNER JOIN tb_itinerario_dias ON tb_dia_horas.iti_dia_id = tb_itinerario_dias.iti_dia_id
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


export const calificaciones = async (req: CustomRequest, res: Response) => {
  const {tipo} = req.body;
  try {
    const sql = `
    SELECT pi.pi_id,
    pi.pi_nombre,
    pi.pi_direccion,
    ROUND(AVG(cal.cal_puntuacion), 2) AS promedio_calificaciones
    FROM tb_puntos_interes AS pi
    LEFT JOIN tb_calificaciones AS cal ON pi.pi_id = cal.pi_id
    GROUP BY pi.pi_id, pi.pi_nombre
    HAVING promedio_calificaciones IS NOT NULL
    ORDER BY
    CASE WHEN :tipo = 'mejor' THEN AVG(cal.cal_puntuacion) END DESC,
    CASE WHEN :tipo = 'peor' THEN AVG(cal.cal_puntuacion) END ASC
    LIMIT 10;  
    `;
    const results = await db.query(sql, {
      replacements: {tipo},
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