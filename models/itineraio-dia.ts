import { DataTypes} from 'sequelize';
import db from '../db/conexion';


const DiaIti:any= db.define('tb_itinerario_dias',{
    iti_dia_id: {
        type: DataTypes.NUMBER,
        primaryKey: true, 
        autoIncrement: true, 
      },
    iti_id:{
        type: DataTypes.NUMBER
    },
    iti_dia_num:{
        type: DataTypes.NUMBER
    },
    iti_dia_fecha:{
        type: DataTypes.DATE
    },
    iti_dia_estado:{
        type: DataTypes.STRING
    }
})

export default DiaIti;