import { Request, Response } from "express";
import db from "../../db/conexion";
import { QueryTypes } from "sequelize";

interface CustomRequest extends Request {
  pi_lat?: number;
  pi_lng?: number;
}

export const getPuntosInteresCercanos = async (req: CustomRequest, res: Response) => {
  const { pi_lat, pi_lng } = req.body;
  try {
    const sql = `
    SELECT sub.*
    FROM (
        SELECT p.pi_id, p.pi_nombre, p.pi_direccion, p.pi_lat, p.pi_log,
            (
                6371 * acos(
                    cos(radians(:pi_lat)) * cos(radians(p.pi_lat)) * cos(radians(p.pi_log) - radians(:pi_lng)) +
                    sin(radians(:pi_lat)) * sin(radians(p.pi_lat))
                )
            ) AS distance,
            GROUP_CONCAT(DISTINCT c.cat_nombre) AS categorias,
            CAST(
                IFNULL(
                    (SELECT AVG(cal_puntuacion) FROM tb_calificaciones WHERE pi_id = p.pi_id),
                    0
                ) AS UNSIGNED
            ) AS promedio_calificaciones
        FROM tb_puntos_interes p
        JOIN tb_pi_solicitudes s ON p.pi_id = s.pi_id
        JOIN tb_pi_categorias pc ON p.pi_id = pc.pi_id
        JOIN tb_categorias c ON pc.cat_id = c.cat_id
        WHERE p.pi_estado = 'A'
        GROUP BY p.pi_id, p.pi_nombre, p.pi_direccion, p.pi_lat, p.pi_log, distance
    ) AS sub
    WHERE sub.distance <= 5 
    ORDER BY sub.distance;
    `;
    const results = await db.query(sql, {
      replacements: { pi_lat, pi_lng },
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
export const getTotalUsuarios = async (req: CustomRequest, res: Response) => {
  try {
    const sql = `
    SELECT
    (SELECT COUNT(*) FROM tb_usuarios WHERE rol_id = 3) AS total_turistas,
    (SELECT COUNT(*) FROM tb_itinerarios) AS total_itinerarios_generados,
    (SELECT COUNT(*) FROM tb_personas WHERE per_id IN (SELECT per_id FROM tb_usuarios WHERE rol_id = 2)) AS total_dueños,
    COUNT(*) AS total_solicitudes
FROM tb_pi_solicitudes;
    `;
    const results = await db.query(sql, { type: QueryTypes.SELECT });
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};