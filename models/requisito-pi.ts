import { DataTypes} from 'sequelize';
import db from '../db/conexion';


const RequisitoPi:any= db.define('tb_pi_requisitos',{
    req_id: {
        type: DataTypes.NUMBER,
        primaryKey: true, 
        autoIncrement: true, 
      },

    pi_id:{
        type: DataTypes.NUMBER
    },
    req_nombre:{
        type: DataTypes.STRING
    },
    req_descripcion:{
        type: DataTypes.STRING
    },
    req_documento:{
        type: DataTypes.STRING
    },
    req_estado:{
        type: DataTypes.STRING
    }

})

export default RequisitoPi;