import { DataTypes} from 'sequelize';
import db from '../db/conexion';


const SolicitudPi:any= db.define('tb_pi_solicitudes',{
    pi_soli_id: {
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
    pi_soli_fecha:{
        type: DataTypes.STRING
    },
    pi_soli_descripcion:{
        type: DataTypes.STRING
    },
    pi_soli_estado:{
        type: DataTypes.STRING
    }
})

export default SolicitudPi;