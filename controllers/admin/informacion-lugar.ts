import { Request, Response } from "express";
import db from "../../db/conexion";
import { QueryTypes } from "sequelize";

interface CustomRequest extends Request {
    pi_id?: string;
}

export const infoLugar = async (req: CustomRequest, res: Response) => {
  const { pi_id } = req.params;
  try {
    const sql = `
    SELECT 
    persona.per_id,
    persona.per_nombres,
    persona.per_apellidos,
    persona.per_cel,
    usuario.usu_email,
    pi.pi_id,
    pi.pi_nombre,
    pi.pi_direccion,
    pi.pi_log,
    pi.pi_lat,
    CAST(ROUND(AVG(cal.cal_puntuacion)) AS SIGNED) AS calificacion_promedio,
    pi.pi_cali_google,
    pi.pi_users_cali_google,
    sol.per_id,
    sol.pi_soli_descripcion,
    GROUP_CONCAT(DISTINCT img.img_url) AS lista_fotos,
    GROUP_CONCAT(DISTINCT cat.cat_nombre) AS lista_categorias,
    GROUP_CONCAT(DISTINCT req.req_nombre) AS lista_requisitos
FROM tb_puntos_interes AS pi
LEFT JOIN tb_pi_solicitudes AS sol ON pi.pi_id = sol.pi_id
LEFT JOIN tb_personas AS persona ON sol.per_id = persona.per_id
LEFT JOIN tb_usuarios AS usuario ON persona.per_id = usuario.per_id
LEFT JOIN tb_imagenes AS img ON pi.pi_id = img.pi_id
LEFT JOIN tb_pi_categorias AS pi_cat ON pi.pi_id = pi_cat.pi_id
LEFT JOIN tb_categorias AS cat ON pi_cat.cat_id = cat.cat_id
LEFT JOIN tb_pi_requisitos AS req ON pi.pi_id = req.pi_id
LEFT JOIN tb_calificaciones AS cal ON pi.pi_id = cal.pi_id
WHERE pi.pi_id = :pi_id
GROUP BY pi.pi_id, persona.per_id, usuario.usu_email;
    `;
    const results = await db.query(sql, {
      replacements: { pi_id },
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
