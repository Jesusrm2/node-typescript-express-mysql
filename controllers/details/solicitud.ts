import { Request, Response } from "express";
import db from "../../db/conexion";
import { QueryTypes } from "sequelize";

interface CustomRequest extends Request {
  pi_soli_id?: string;
}

export const getPiSolicitud = async (req: CustomRequest, res: Response) => {
  const { per_id } = req.params;
  try {
    const sql = `
    SELECT pi.pi_id, pi.pi_nombre, pi.pi_direccion, ps.pi_soli_descripcion, ps.pi_soli_fecha, pi.pi_estado
    FROM tb_personas p
    JOIN tb_pi_solicitudes ps ON p.per_id = ps.per_id
    JOIN tb_puntos_interes pi ON ps.pi_id = pi.pi_id
    WHERE p.per_id = :per_id
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
export const getPiSolicitudSemana = async (req: CustomRequest, res: Response) => {
  try {
    const sql = `
    SELECT DATE_SUB(CURDATE(), INTERVAL n.number DAY) AS fecha_creacion, COUNT(t.pi_soli_id) AS cantidad_solicitudes
    FROM (
        SELECT 0 AS number UNION ALL
        SELECT 1 UNION ALL
        SELECT 2 UNION ALL
        SELECT 3 UNION ALL
        SELECT 4 UNION ALL
        SELECT 5 UNION ALL
        SELECT 6
    ) n
    LEFT JOIN tb_pi_solicitudes t ON DATE(t.createdAt) = DATE_SUB(CURDATE(), INTERVAL n.number DAY)
    GROUP BY fecha_creacion
    ORDER BY fecha_creacion;
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