import { Request, Response } from "express";
import db from "../../db/conexion";
import { QueryTypes } from "sequelize";

interface CustomRequest extends Request {
  inicio?: Date;
  fin?: Date;
}

export const getTotalesCategorias = async (req: CustomRequest, res: Response) => {
  try {
    const sql = `
    SELECT c.cat_nombre AS category, COUNT(DISTINCT p.pi_id) AS total
    FROM tb_categorias c
    LEFT JOIN tb_pi_categorias pc ON c.cat_id = pc.cat_id
    LEFT JOIN tb_puntos_interes p ON pc.pi_id = p.pi_id
    LEFT JOIN tb_pi_horas ph ON p.pi_id = ph.pi_id
    LEFT JOIN tb_dia_horas dh ON ph.dia_hora_id = dh.dia_hora_id
    GROUP BY c.cat_nombre;
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

export const totalesCategoriasFecha = async (req: CustomRequest, res: Response) => {
  const {inicio, fin  } = req.body;
  try {
    const sql = `
SELECT c.cat_nombre AS category, COALESCE(total_visitas, 0) AS total
FROM tb_categorias c
LEFT JOIN (
    SELECT pc.cat_id, COUNT(DISTINCT p.pi_id) AS total_visitas
    FROM tb_pi_categorias pc
    LEFT JOIN tb_puntos_interes p ON pc.pi_id = p.pi_id
    LEFT JOIN tb_pi_horas ph ON p.pi_id = ph.pi_id
    LEFT JOIN tb_dia_horas dh ON ph.dia_hora_id = dh.dia_hora_id
    LEFT JOIN tb_itinerario_dias id ON dh.iti_dia_id = id.iti_dia_id
    WHERE id.iti_dia_fecha >= :inicio AND id.iti_dia_fecha <= :fin
    GROUP BY pc.cat_id
) AS subquery ON c.cat_id = subquery.cat_id
ORDER BY c.cat_nombre;

    
    `;
    const results = await db.query(sql, {
      replacements: {inicio, fin },
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
