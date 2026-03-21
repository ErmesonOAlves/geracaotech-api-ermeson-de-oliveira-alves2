import 'dotenv/config';
import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
let sequelize;
if (env==='test') {
  sequelize = new Sequelize('db_test', 'user_test', 'password_test', {
    host: 'localhost',
    port: 5433, 
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: true,
      underscored: true
    }
  });
} else {
   sequelize = process.env.DATABASE_URL 
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false 
        }
      },
      logging: false
    })
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      port: process.env.SQL_PORT,
      dialect: 'mysql'
    });

}
export default sequelize;