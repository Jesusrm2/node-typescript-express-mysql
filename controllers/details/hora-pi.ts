import { Request, Response } from "express";
import db from "../../db/conexion";
import { QueryTypes } from "sequelize";

interface CustomRequest extends Request {
    iti_dia_id?: string;
}

export const getHoraPuntoIntereses = async (req: CustomRequest, res: Response) => {
  const { iti_dia_id } = req.params;
  try {
    const sql = `

    
    SELECT pi.pi_id,dh.dia_hora_id,pi.pi_nombre AS punto_interes,pi.pi_direccion AS direccion, dh.hora AS hora, IFNULL(c.cal_puntuacion, 0) AS calificacion, IFNULL(c.cal_comentario, 'Sin comentario') AS comentario
    FROM tb_dia_horas dh
    JOIN tb_pi_horas ph ON dh.dia_hora_id = ph.dia_hora_id
    JOIN tb_puntos_interes pi ON ph.pi_id = pi.pi_id
    LEFT JOIN tb_calificaciones c ON pi.pi_id = c.pi_id
    WHERE dh.iti_dia_id = :iti_dia_id
    ORDER BY dh.hora;
    `;
    const results = await db.query(sql, {
      replacements: { iti_dia_id },
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
