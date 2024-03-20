import { DataTypes} from 'sequelize';
import db from '../db/conexion';


const Itinerario:any= db.define('tb_itinerarios',{
    iti_id: {
        type: DataTypes.NUMBER,
        primaryKey: true, // Si es la clave primaria, añade esta propiedad
        autoIncrement: true, // Si es autoincremental, añade esta propiedad
      },
    per_id:{
        type: DataTypes.NUMBER
    },
    iti_fecha_inicio:{
        type: DataTypes.DATE
    },
    iti_dias:{
        type: DataTypes.NUMBER
    },
    iti_hora_inicio:{
        type: DataTypes.TIME
    },
    iti_hora_fin:{
        type: DataTypes.TIME
    },
    iti_estado:{
        type: DataTypes.STRING
    }
})

export default Itinerario;