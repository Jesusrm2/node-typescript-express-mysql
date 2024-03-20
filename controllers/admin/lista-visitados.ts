import { Request, Response } from "express";
import db from "../../db/conexion";
import { QueryTypes } from "sequelize";

interface CustomRequest extends Request {
  tipo?: Date;

}

export const listaMasMenosVisitados = async (req: CustomRequest, res: Response) => {
  const { tipo } = req.body;
  try {
    const sql = `
    SELECT pi_id, pi_nombre, pi_direccion, total_visitas
    FROM (
        SELECT pi.pi_id,
               pi.pi_nombre,
               pi.pi_direccion,
               COUNT(DISTINCT iti.iti_id) AS total_visitas
        FROM tb_puntos_interes AS pi
        JOIN tb_pi_horas AS pi_hora ON pi.pi_id = pi_hora.pi_id
        JOIN tb_dia_horas AS dia_hora ON pi_hora.dia_hora_id = dia_hora.dia_hora_id
        JOIN tb_itinerario_dias AS dia ON dia_hora.iti_dia_id = dia.iti_dia_id
        JOIN tb_itinerarios AS iti ON dia.iti_id = iti.iti_id
        WHERE iti.iti_estado = 'A'
          AND dia.iti_dia_estado = 'A'
          AND dia_hora.dia_hora_estado = 'A'
        GROUP BY pi.pi_id, pi.pi_nombre
    ) AS subquery
    ORDER BY 
        CASE WHEN :tipo = 'mas' THEN total_visitas END DESC,
        CASE WHEN :tipo = 'menos' THEN total_visitas END ASC
    LIMIT 10;
    `;
    const results = await db.query(sql, {
      replacements: { tipo },
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
