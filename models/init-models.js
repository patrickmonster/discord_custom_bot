var DataTypes = require("sequelize").DataTypes;
var _command = require("./command");
var _command_process = require("./command_process");
var _recvie_event = require("./recvie_event");
var _recvie_intent = require("./recvie_intent");
var _token = require("./token");

function initModels(sequelize) {
  var command = _command(sequelize, DataTypes);
  var command_process = _command_process(sequelize, DataTypes);
  var recvie_event = _recvie_event(sequelize, DataTypes);
  var recvie_intent = _recvie_intent(sequelize, DataTypes);
  var token = _token(sequelize, DataTypes);

  command_process.belongsTo(command, { as: "idx_command", foreignKey: "idx"});
  command.hasOne(command_process, { as: "command_process", foreignKey: "idx"});
  command_process.belongsTo(command_process, { as: "parent_command_process", foreignKey: "parent"});
  command_process.hasMany(command_process, { as: "command_processes", foreignKey: "parent"});
  recvie_intent.belongsTo(token, { as: "idx_token", foreignKey: "idx"});
  token.hasMany(recvie_intent, { as: "recvie_intents", foreignKey: "idx"});

  return {
    command,
    command_process,
    recvie_event,
    recvie_intent,
    token,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
