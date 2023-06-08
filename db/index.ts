import * as dotenv from 'dotenv';
import { readdirSync } from 'fs';
import path, { basename } from 'path';
import { DataTypes, Sequelize } from 'sequelize';
import { fileURLToPath } from 'url';

dotenv.config();

const db: any = {};
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { DB_DATABASE = '', DB_USERNAME = '', DB_PASSWORD = '', DB_HOST = '', DB_PORT = '3000' } = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: process.env.NODE_ENV === 'DEV' ? 'localhost' : DB_HOST,
  dialect: 'postgres',
  port: parseInt(DB_PORT, 10),
  pool: {
    max: 300,
    min: 10,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    paranoid: true,
    underscored: true,
  },
  logging: false,
});

const files = readdirSync(__dirname).filter(
  (file) => file.indexOf('.') !== 0 && file !== basename(__filename) && file.slice(-3) === '.js'
);

for await (const file of files) {
  const model = await import(`./${file}`);
  const namedModel = model.default(sequelize, DataTypes);
  db[namedModel.name] = namedModel;
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.info('sequelize Connection has been established successfully.');
  })
  .catch((e) => console.error(e, { msg: 'Unable to connect to the database' }));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

await db.sequelize.sync();

export default db;
