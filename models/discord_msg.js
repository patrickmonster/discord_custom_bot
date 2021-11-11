const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('discord_msg', {
    channel: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    user_login: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    msg: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'discord_msg',
    timestamps: false,
    indexes: [
      {
        name: "chatbot_msg_channel_IDX",
        using: "BTREE",
        fields: [
          { name: "channel" },
          { name: "create_at" },
        ]
      },
    ]
  });
};
