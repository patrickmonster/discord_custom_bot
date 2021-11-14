const SequelizeAuto = require('sequelize-auto');

require('dotenv').config();
// const env = process.env.NODE_ENV && "development";
const config = require('./config/config.json')[process.env.NODE_ENV || "development"];

const auto = new SequelizeAuto(config.database, config.username, config.password, {
	host: config.host,
	port: '3306',
	dialect: config.dialect,
});
auto.run((err) => {
	if (err) throw err;
});