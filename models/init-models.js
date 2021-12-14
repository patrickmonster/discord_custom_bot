var DataTypes = require("sequelize").DataTypes;
var _command_log = require("./command_log");
var _recvie_event = require("./recvie_event");
var _recvie_intent = require("./recvie_intent");
var _token = require("./token");

function initModels(sequelize) {
  var command_log = _command_log(sequelize, DataTypes);
  var recvie_event = _recvie_event(sequelize, DataTypes);
  var recvie_intent = _recvie_intent(sequelize, DataTypes);
  var token = _token(sequelize, DataTypes);

  command_log.belongsTo(token, { as: "idx_token", foreignKey: "idx"});
  token.hasMany(command_log, { as: "command_logs", foreignKey: "idx"});
  recvie_event.belongsTo(token, { as: "idx_token", foreignKey: "idx"});
  token.hasMany(recvie_event, { as: "recvie_events", foreignKey: "idx"});
  recvie_intent.belongsTo(token, { as: "idx_token", foreignKey: "idx"});
  token.hasMany(recvie_intent, { as: "recvie_intents", foreignKey: "idx"});

  return {
    command_log,
    recvie_event,
    recvie_intent,
    token,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
