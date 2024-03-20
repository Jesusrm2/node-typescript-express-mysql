import { DataTypes} from 'sequelize';
import db from '../db/conexion';


const Persona:any= db.define('tb_persona',{
    per_id: {
        type: DataTypes.NUMBER,
        primaryKey: true, // Si es la clave primaria, añade esta propiedad
        autoIncrement: true, // Si es autoincremental, añade esta propiedad
      },
    per_cel:{
        type: DataTypes.STRING
    },
    per_nombres:{
        type: DataTypes.NUMBER
    },
    per_apellidos:{
        type: DataTypes.NUMBER
    },
    per_estado:{
        type: DataTypes.STRING
    }
})

export default Persona;