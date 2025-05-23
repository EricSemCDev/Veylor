import Sequelize from 'sequelize';
import userModel from './user.js';
import dbConfig from '../../config/config.js';

const sequelize = new Sequelize(
  dbConfig.development.database,
  dbConfig.development.username,
  dbConfig.development.password,
  {
    host: dbConfig.development.host,
    dialect: dbConfig.development.dialect,
    logging: false,
  }
);

const db = {
  Sequelize,
  sequelize,
  User: userModel(sequelize, Sequelize.DataTypes)
};

export default db;
