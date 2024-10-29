import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,           // app_db
    process.env.DB_USERNAME,       // root
    process.env.DB_PASSWORD,       // rootpassword
    {
        host: process.env.DB_HOST, // mysqldb
        port: process.env.DB_PORT, // 3306
        dialect: 'mysql',
        logging: false
    }
);

export default sequelize;
