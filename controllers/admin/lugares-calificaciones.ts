import { Request, Response } from "express";
import db from "../../db/conexion";
import { QueryTypes } from "sequelize";

interface CustomRequest extends Request {
  lng?: number;
  lat?: number;
  radio?:number;
  nombre?:string;
}

export const genenralCalicacionesLugar = async (req: CustomRequest, res: Response) => {
  const { lng, lat,radio } = req.body;
  try {
    const sql = `
    SELECT 
    pi.pi_id,
    pi.pi_nombre,
    pi.pi_direccion,
    pi.pi_cali_google,
    ROUND(AVG(cal.cal_puntuacion)) AS calificacion_promedio
FROM tb_puntos_interes AS pi
LEFT JOIN tb_calificaciones AS cal ON pi.pi_id = cal.pi_id
WHERE 
    ST_Distance_Sphere(POINT(pi.pi_log, pi.pi_lat), POINT(:lng,:lat)) < :radio
GROUP BY pi.pi_id, pi.pi_nombre, pi.pi_lat, pi.pi_log
HAVING calificacion_promedio IS NOT NULL;


    `;
    const results = await db.query(sql, {
      replacements: {lng, lat,radio },
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


export const buscarLugar = async (req: CustomRequest, res: Response) => {
  const { nombre } = req.params;
  try {
    const sql = `
    SELECT 
    pi.pi_id,
    pi.pi_nombre,
    pi.pi_direccion,
    GROUP_CONCAT(DISTINCT cat.cat_nombre) AS categorias,
    IFNULL(visitas.total_visitas, 0) AS total_visitas,
    IFNULL(calificadas.total_personas_calificadas, 0) AS total_personas_calificadas,
    IFNULL(promedios.promedio_calificaciones, 0) AS promedio_calificaciones
    FROM tb_puntos_interes pi
    LEFT JOIN (
        SELECT pi_id, COUNT(*) AS total_visitas
        FROM tb_pi_horas ph
        JOIN tb_dia_horas dh ON ph.dia_hora_id = dh.dia_hora_id
        JOIN tb_itinerario_dias dia ON dh.iti_dia_id = dia.iti_dia_id
        WHERE dia.iti_dia_estado = 'A' AND dh.dia_hora_estado = 'A'
        GROUP BY pi_id
    ) AS visitas ON pi.pi_id = visitas.pi_id
    LEFT JOIN (
        SELECT pi_id, COUNT(DISTINCT per_id) AS total_personas_calificadas
        FROM tb_calificaciones
        GROUP BY pi_id
    ) AS calificadas ON pi.pi_id = calificadas.pi_id
    LEFT JOIN (
        SELECT pi_id, AVG(cal_puntuacion) AS promedio_calificaciones
        FROM tb_calificaciones
        GROUP BY pi_id
    ) AS promedios ON pi.pi_id = promedios.pi_id
    LEFT JOIN tb_pi_categorias picat ON pi.pi_id = picat.pi_id
    LEFT JOIN tb_categorias cat ON picat.cat_id = cat.cat_id
    WHERE pi.pi_nombre LIKE '%${nombre}%'
    GROUP BY pi.pi_nombre;
    `;
    const results = await db.query(sql, {
      replacements: { nombre },
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


export const buscarLugares = async (req: CustomRequest, res: Response) => {
  try {
    const sql = `
    SELECT 
    pi.pi_id,
    pi.pi_nombre,
    pi.pi_direccion,
    GROUP_CONCAT(DISTINCT cat.cat_nombre) AS categorias,
    IFNULL(visitas.total_visitas, 0) AS total_visitas,
    IFNULL(calificadas.total_personas_calificadas, 0) AS total_personas_calificadas,
    IFNULL(promedios.promedio_calificaciones, 0) AS promedio_calificaciones
    FROM tb_puntos_interes pi
    LEFT JOIN (
        SELECT pi_id, COUNT(*) AS total_visitas
        FROM tb_pi_horas ph
        JOIN tb_dia_horas dh ON ph.dia_hora_id = dh.dia_hora_id
        JOIN tb_itinerario_dias dia ON dh.iti_dia_id = dia.iti_dia_id
        WHERE dia.iti_dia_estado = 'A' AND dh.dia_hora_estado = 'A'
        GROUP BY pi_id
    ) AS visitas ON pi.pi_id = visitas.pi_id
    LEFT JOIN (
        SELECT pi_id, COUNT(DISTINCT per_id) AS total_personas_calificadas
        FROM tb_calificaciones
        GROUP BY pi_id
    ) AS calificadas ON pi.pi_id = calificadas.pi_id
    LEFT JOIN (
        SELECT pi_id, AVG(cal_puntuacion) AS promedio_calificaciones
        FROM tb_calificaciones
        GROUP BY pi_id
    ) AS promedios ON pi.pi_id = promedios.pi_id
    LEFT JOIN tb_pi_categorias picat ON pi.pi_id = picat.pi_id
    LEFT JOIN tb_categorias cat ON picat.cat_id = cat.cat_id
    GROUP BY pi.pi_nombre;
    
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
