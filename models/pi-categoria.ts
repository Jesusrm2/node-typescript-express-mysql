import { DataTypes} from 'sequelize';
import db from '../db/conexion';


const PiCalificaciones:any= db.define('tb_pi_categorias',{
    pi_cat_id: {
        type: DataTypes.NUMBER,
        primaryKey: true, 
        autoIncrement: true, 
      },
    pi_id:{
        type: DataTypes.NUMBER
    },
    cat_id:{
        type: DataTypes.NUMBER
    }
})

export default PiCalificaciones;