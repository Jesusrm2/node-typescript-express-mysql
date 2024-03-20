import { Request, Response } from "express";
import db from "../../db/conexion";
import { QueryTypes } from "sequelize";

interface CustomRequest extends Request {
    pi_id?: string;
}

export const getItinerarioLugar = async (req: CustomRequest, res: Response) => {
  const { pi_id } = req.params;
  try {
    const sql = `
    SELECT p.pi_id, p.pi_nombre, p.pi_direccion,
    IFNULL(
        CAST((SELECT AVG(cal_puntuacion) FROM tb_calificaciones WHERE pi_id = p.pi_id) AS INT),
        0
    ) AS promedio_calificacion,
    IFNULL(p.pi_cali_google, 0) AS calificacion_google
FROM tb_puntos_interes p
WHERE p.pi_id = :pi_id
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
