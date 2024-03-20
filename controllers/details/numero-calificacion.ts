import { Request, Response } from "express";
import db from "../../db/conexion";
import { QueryTypes } from "sequelize";

interface CustomRequest extends Request {
    per_id?: string;
}

export const getNumCalificados = async (req: CustomRequest, res: Response) => {
  const { per_id } = req.params;
  try {
    const sql = `

    SELECT COUNT(*) AS total_calificados
    FROM tb_calificaciones
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
export const getCalificacionesSemana = async (req: CustomRequest, res: Response) => {
  try {
    const sql = `
    SELECT DATE_SUB(CURDATE(), INTERVAL n.number DAY) AS fecha_creacion, COUNT(t.cal_id) AS cantidad_calificaciones
    FROM (
        SELECT 0 AS number UNION ALL
        SELECT 1 UNION ALL
        SELECT 2 UNION ALL
        SELECT 3 UNION ALL
        SELECT 4 UNION ALL
        SELECT 5 UNION ALL
        SELECT 6
    ) n
    LEFT JOIN tb_calificaciones t ON DATE(t.createdAt) = DATE_SUB(CURDATE(), INTERVAL n.number DAY)
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