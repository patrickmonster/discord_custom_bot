var DataTypes = require("sequelize").DataTypes;
var _token = require("./token");

function initModels(sequelize) {
  var token = _token(sequelize, DataTypes);


  return {
    token,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
