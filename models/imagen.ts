import { DataTypes} from 'sequelize';
import db from '../db/conexion';


const Imagen:any= db.define('tb_imagenes',{
    img_id: {
        type: DataTypes.NUMBER,
        primaryKey: true, 
        autoIncrement: true, 
      },
    pi_id:{
        type: DataTypes.NUMBER
    },
    img_url:{
        type: DataTypes.STRING
    },
    img_estado:{
        type: DataTypes.STRING
    }
})

export default Imagen;