import { DataTypes} from 'sequelize';
import db from '../db/conexion';


const DiaHora:any= db.define('tb_dia_horas',{
    dia_hora_id: {
        type: DataTypes.NUMBER,
        primaryKey: true, 
        autoIncrement: true, 
      },
    iti_dia_id:{
        type: DataTypes.NUMBER
    },
    hora:{
        type: DataTypes.TIME
    },
    minutos:{
        type: DataTypes.NUMBER
    },
    dia_hora_estado:{
        type: DataTypes.STRING
    }
})

export default DiaHora;