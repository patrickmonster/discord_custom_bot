var DataTypes = require("sequelize").DataTypes;
var _authentication = require("./authentication");
var _authentication_child = require("./authentication_child");
var _authentication_data = require("./authentication_data");
var _authentication_token = require("./authentication_token");
var _chatbot_join = require("./chatbot_join");
var _crew = require("./crew");
var _db_logs = require("./db_logs");
var _discord_community = require("./discord_community");
var _discord_msg = require("./discord_msg");
var _discord_subscription = require("./discord_subscription");
var _donate_log = require("./donate_log");
var _donation_log = require("./donation_log");
var _file_index = require("./file_index");
var _guild_register = require("./guild_register");
var _live_monit_command = require("./live_monit_command");
var _live_monit_notice_webhook = require("./live_monit_notice_webhook");
var _live_monit_streams = require("./live_monit_streams");
var _live_on_channels = require("./live_on_channels");
var _live_on_monits = require("./live_on_monits");
var _live_on_servers = require("./live_on_servers");
var _live_stream_upload = require("./live_stream_upload");
var _live_stream_upload_state = require("./live_stream_upload_state");
var _point_log = require("./point_log");
var _point_user = require("./point_user");
var _question_data = require("./question_data");
var _service_bot_command = require("./service_bot_command");
var _service_fan_art = require("./service_fan_art");
var _service_invite_link = require("./service_invite_link");
var _service_join_nick = require("./service_join_nick");
var _service_table = require("./service_table");
var _stream_online_events = require("./stream_online_events");
var _youtube_tokens = require("./youtube_tokens");

function initModels(sequelize) {
  var authentication = _authentication(sequelize, DataTypes);
  var authentication_child = _authentication_child(sequelize, DataTypes);
  var authentication_data = _authentication_data(sequelize, DataTypes);
  var authentication_token = _authentication_token(sequelize, DataTypes);
  var chatbot_join = _chatbot_join(sequelize, DataTypes);
  var crew = _crew(sequelize, DataTypes);
  var db_logs = _db_logs(sequelize, DataTypes);
  var discord_community = _discord_community(sequelize, DataTypes);
  var discord_msg = _discord_msg(sequelize, DataTypes);
  var discord_subscription = _discord_subscription(sequelize, DataTypes);
  var donate_log = _donate_log(sequelize, DataTypes);
  var donation_log = _donation_log(sequelize, DataTypes);
  var file_index = _file_index(sequelize, DataTypes);
  var guild_register = _guild_register(sequelize, DataTypes);
  var live_monit_command = _live_monit_command(sequelize, DataTypes);
  var live_monit_notice_webhook = _live_monit_notice_webhook(sequelize, DataTypes);
  var live_monit_streams = _live_monit_streams(sequelize, DataTypes);
  var live_on_channels = _live_on_channels(sequelize, DataTypes);
  var live_on_monits = _live_on_monits(sequelize, DataTypes);
  var live_on_servers = _live_on_servers(sequelize, DataTypes);
  var live_stream_upload = _live_stream_upload(sequelize, DataTypes);
  var live_stream_upload_state = _live_stream_upload_state(sequelize, DataTypes);
  var point_log = _point_log(sequelize, DataTypes);
  var point_user = _point_user(sequelize, DataTypes);
  var question_data = _question_data(sequelize, DataTypes);
  var service_bot_command = _service_bot_command(sequelize, DataTypes);
  var service_fan_art = _service_fan_art(sequelize, DataTypes);
  var service_invite_link = _service_invite_link(sequelize, DataTypes);
  var service_join_nick = _service_join_nick(sequelize, DataTypes);
  var service_table = _service_table(sequelize, DataTypes);
  var stream_online_events = _stream_online_events(sequelize, DataTypes);
  var youtube_tokens = _youtube_tokens(sequelize, DataTypes);

  authentication_data.belongsTo(authentication, { as: "index_count_authentication", foreignKey: "index_count"});
  authentication.hasOne(authentication_data, { as: "authentication_datum", foreignKey: "index_count"});
  discord_subscription.belongsTo(authentication, { as: "id_authentication", foreignKey: "id"});
  authentication.hasMany(discord_subscription, { as: "discord_subscriptions", foreignKey: "id"});
  live_stream_upload.belongsTo(live_on_monits, { as: "twitch", foreignKey: "twitch_id"});
  live_on_monits.hasOne(live_stream_upload, { as: "live_stream_upload", foreignKey: "twitch_id"});
  live_stream_upload.belongsTo(youtube_tokens, { as: "youtube", foreignKey: "youtube_id"});
  youtube_tokens.hasOne(live_stream_upload, { as: "live_stream_upload", foreignKey: "youtube_id"});

  return {
    authentication,
    authentication_child,
    authentication_data,
    authentication_token,
    chatbot_join,
    crew,
    db_logs,
    discord_community,
    discord_msg,
    discord_subscription,
    donate_log,
    donation_log,
    file_index,
    guild_register,
    live_monit_command,
    live_monit_notice_webhook,
    live_monit_streams,
    live_on_channels,
    live_on_monits,
    live_on_servers,
    live_stream_upload,
    live_stream_upload_state,
    point_log,
    point_user,
    question_data,
    service_bot_command,
    service_fan_art,
    service_invite_link,
    service_join_nick,
    service_table,
    stream_online_events,
    youtube_tokens,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
