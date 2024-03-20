import { DataTypes} from 'sequelize';
import db from '../db/conexion';


const Calificacion:any= db.define('tb_calificaciones',{
    cal_id: {
        type: DataTypes.NUMBER,
        primaryKey: true, 
        autoIncrement: true, 
      },
    pi_id:{
        type: DataTypes.NUMBER
    },
    per_id:{
        type: DataTypes.NUMBER
    },
    cal_comentario:{
        type: DataTypes.STRING
    },
    cal_puntuacion:{
        type: DataTypes.NUMBER
    },
    cal_estado:{
        type: DataTypes.STRING
    }
})

export default Calificacion;