const Sequelize = require('sequelize');
const { getUserModel } = require('./user');
const { getTaskModel } = require('./task');

require('dotenv').config()

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
    },
);

const models = {
    User: getUserModel(sequelize, Sequelize),
    Task: getTaskModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});


// exports.module = { models };

// exports.default = sequelize;

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = getUserModel(sequelize, Sequelize);
db.tasks = getTaskModel(sequelize, Sequelize);

module.exports = db;