import 'dotenv/config';
import { Sequelize } from 'sequelize';

// Se existir DATABASE_URL (nuvem), usa ela. Se não, usa as credenciais locais (MySQL).
const sequelize = process.env.DATABASE_URL 
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // Essencial para Neon e Render
        }
      },
      logging: false
    })
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      port: process.env.SQL_PORT,
      dialect: 'mysql'
    });

export default sequelize;