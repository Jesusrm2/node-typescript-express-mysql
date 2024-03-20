import { DataTypes} from 'sequelize';
import db from '../db/conexion';


const PuntoInteres:any= db.define('tb_puntos_interes',{
    pi_id: {
        type: DataTypes.NUMBER,
        primaryKey: true, // Si es la clave primaria, añade esta propiedad
        autoIncrement: true, // Si es autoincremental, añade esta propiedad
      },
    pi_place_id:{
        type: DataTypes.STRING
    },
    pi_nombre:{
        type: DataTypes.STRING
    },
    pi_direccion:{
        type: DataTypes.STRING,
    },
    pi_log:{
        type: DataTypes.NUMBER
    },
    pi_lat:{
        type: DataTypes.NUMBER
    },
    pi_cali_google:{
        type: DataTypes.NUMBER
    },
    pi_users_cali_google:{
        type: DataTypes.NUMBER
    },
    pi_estado:{
        type: DataTypes.STRING,
    }
})

export default PuntoInteres;