import { DataTypes} from 'sequelize';
import db from '../db/conexion';


const Usuario:any= db.define('tb_usuario',{
    id_user: {
        type: DataTypes.NUMBER,
        primaryKey: true, // Si es la clave primaria, añade esta propiedad
        autoIncrement: true, // Si es autoincremental, añade esta propiedad
    },
    per_id:{
        type: DataTypes.NUMBER
    },
    rol_id:{
        type: DataTypes.NUMBER
    },
    usu_email:{
        type: DataTypes.STRING
    },
    usu_contra:{
        type: DataTypes.STRING,
    },
    usu_estado:{
        type: DataTypes.STRING
    }
    
})

export default Usuario;