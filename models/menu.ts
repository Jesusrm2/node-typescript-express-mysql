import { DataTypes} from 'sequelize';
import db from '../db/conexion';


const Menu:any= db.define('tb_menus',{
    men_id: {
        type: DataTypes.NUMBER,
        primaryKey: true, 
        autoIncrement: true, 
      },
    men_nombre:{
        type: DataTypes.STRING
    },
    men_icon:{
        type: DataTypes.STRING
    },
    men_descripcion:{
        type: DataTypes.STRING
    },
    men_estado:{
        type: DataTypes.STRING
    }
})

export default Menu;