import { Request, Response } from "express";
import db from "../../db/conexion";
import { QueryTypes } from "sequelize";

export const getSolicitudesGneral = async (req: Request, res: Response) => {
  try {
    const sql = `
        
   SELECT
    ps.pi_soli_id,
    pi.pi_id,
    CONCAT(per.per_nombres, ' ', per.per_apellidos) AS persona,
    pi.pi_estado AS estado,
    pi.pi_nombre AS lugar,
    pi.pi_direccion AS direccion,
    ps.pi_soli_fecha AS fecha, ps.pi_soli_descripcion AS motivo
    FROM
    tb_pi_solicitudes ps
    INNER JOIN tb_personas per ON ps.per_id = per.per_id
    INNER JOIN tb_puntos_interes pi ON ps.pi_id = pi.pi_id
    WHERE
    ps.pi_soli_estado = 'A';
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
