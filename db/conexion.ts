import { Sequelize} from "sequelize";

const db = new Sequelize('database', 'username', 'password', {
    host: "localhost",
    dialect : 'mysql',

  });

export default db;
