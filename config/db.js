const { Sequelize } = require("sequelize");

require("dotenv").config();

const areasModel = require("../models/db/areas.model");
const employeesModel = require("../models/db/employees.model");
const userModel = require("../models/db/users.model");
const autopartModel = require("../models/db/autopart.model");
const orderModel = require("../models/db/order.model");
const formModel = require("../models/db/form.model");

const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.SQL_PORT,
    dialect: process.env.DIALECT,
    dialectOptions: {
      options: { encrypt: false },
    },
  }
);

const db = {
  Areas: areasModel(sequelize),
  Empleados: employeesModel(sequelize),
  Usuarios: userModel(sequelize),
  Autoparte: autopartModel(sequelize),
  Pedido: orderModel(sequelize),
  Formulario: formModel(sequelize)
};

// sync all models with database
sequelize.sync({ alter: false });

module.exports = db;