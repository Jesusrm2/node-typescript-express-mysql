import { DataTypes} from 'sequelize';
import db from '../db/conexion';


const Rol:any= db.define('tb_rol',{
    rol_id: {
        type: DataTypes.NUMBER,
        primaryKey: true, 
        autoIncrement: true, 
      },
    rol_nombre:{
        type: DataTypes.STRING
    },
    rol_estado:{
        type: DataTypes.STRING
    }
})

export default Rol;