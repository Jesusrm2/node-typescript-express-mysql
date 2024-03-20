import { DataTypes} from 'sequelize';
import db from '../db/conexion';


const Categoria:any= db.define('tb_categorias',{
    cat_id: {
        type: DataTypes.NUMBER,
        primaryKey: true, 
        autoIncrement: true, 
      },
    pi_id:{
        type: DataTypes.NUMBER
    },
    cat_nombre:{
        type: DataTypes.STRING
    },
    cat_estado:{
        type: DataTypes.STRING
    }
})

export default Categoria;