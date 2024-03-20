import { DataTypes} from 'sequelize';
import db from '../db/conexion';


const HoraPi:any= db.define('tb_pi_horas',{
    hora_pi_id: {
        type: DataTypes.NUMBER,
        primaryKey: true, 
        autoIncrement: true, 
      },
    pi_id:{
        type: DataTypes.NUMBER
    },
    dia_hora_id:{
        type: DataTypes.NUMBER
    }
})

export default HoraPi;