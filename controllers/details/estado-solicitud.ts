import { Request, Response } from "express";
import db from "../../db/conexion";
import { QueryTypes } from "sequelize";

interface CustomRequest extends Request {
    per_id?: string;
}

export const getEstadoSolicitudes = async (req: CustomRequest, res: Response) => {
  const { per_id } = req.params;
  try {
    const sql = `
    SELECT
    COUNT(pi.pi_id) AS total_puntos_interes,
    CAST(SUM(CASE WHEN pi.pi_estado = 'A' THEN 1 ELSE 0 END) AS UNSIGNED) AS solicitudes_aceptadas,
    CAST(SUM(CASE WHEN pi.pi_estado = 'P' THEN 1 ELSE 0 END) AS UNSIGNED) AS solicitudes_pendientes,
    CAST(SUM(CASE WHEN pi.pi_estado = 'I' THEN 1 ELSE 0 END) AS UNSIGNED) AS solicitudes_rechazadas
FROM
    tb_puntos_interes pi
    INNER JOIN tb_pi_solicitudes ps ON pi.pi_id = ps.pi_id
WHERE
    ps.per_id = :per_id
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

export const getEstadoSolicitudesTotal = async (req: CustomRequest, res: Response) => {
  try {
    const sql = `
    SELECT
    COUNT(pi.pi_id) AS total_puntos_interes,
    CAST(SUM(CASE WHEN pi.pi_estado = 'A' THEN 1 ELSE 0 END) AS UNSIGNED) AS solicitudes_aceptadas,
    CAST(SUM(CASE WHEN pi.pi_estado = 'P' THEN 1 ELSE 0 END) AS UNSIGNED) AS solicitudes_pendientes,
    CAST(SUM(CASE WHEN pi.pi_estado = 'I' THEN 1 ELSE 0 END) AS UNSIGNED) AS solicitudes_rechazadas
FROM
    tb_puntos_interes pi
    INNER JOIN tb_pi_solicitudes ps ON pi.pi_id = ps.pi_id
    `;
    const results = await db.query(sql, { type: QueryTypes.SELECT });
    res.json(results);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Error en el servidor',
    });
  }
};

