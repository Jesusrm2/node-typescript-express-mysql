import { Request, Response } from "express";
import db from "../../db/conexion";
import { QueryTypes } from "sequelize";

interface CustomRequest extends Request {
  inicio?: Date;
  fin?: Date;
}

export const getVisitasFecha = async (req: CustomRequest, res: Response) => {
  const { inicio, fin } = req.body;
  try {
    const sql = `

    SELECT
    dia.iti_dia_fecha AS fecha,
    COUNT(pi_hora.pi_id) AS cantidad_puntos_interes_visitados,
    GROUP_CONCAT(pi_hora.pi_id ORDER BY pi_hora.pi_id) AS lugares_visitados_ids,
    GROUP_CONCAT(pi.pi_nombre ORDER BY pi_hora.pi_id) AS nombres_lugares_visitados,
    GROUP_CONCAT(pi.pi_direccion ORDER BY pi_hora.pi_id) AS direcciones_lugares_visitados
FROM tb_itinerarios AS iti
INNER JOIN tb_itinerario_dias AS dia ON iti.iti_id = dia.iti_id
INNER JOIN tb_dia_horas AS dia_hora ON dia.iti_dia_id = dia_hora.iti_dia_id
INNER JOIN tb_pi_horas AS pi_hora ON dia_hora.dia_hora_id = pi_hora.dia_hora_id
INNER JOIN tb_puntos_interes AS pi ON pi_hora.pi_id = pi.pi_id
WHERE dia.iti_dia_fecha BETWEEN :inicio AND :fin
    AND iti.iti_estado = 'A'
    AND dia.iti_dia_estado = 'A'
    AND dia_hora.dia_hora_estado = 'A'
GROUP BY dia.iti_dia_fecha;

    `;
    const results = await db.query(sql, {
      replacements: { inicio, fin },
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
