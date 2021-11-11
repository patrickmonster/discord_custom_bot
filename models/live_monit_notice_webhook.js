const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('live_monit_notice_webhook', {
    index_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    guild_id: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      unique: "live_monit_notice_webhook_UN"
    },
    guild_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    invite: {
      type: DataTypes.CHAR(10),
      allowNull: true,
      comment: "서버 초대링크"
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'live_monit_notice_webhook',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "index_id" },
        ]
      },
      {
        name: "live_monit_notice_webhook_UN",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "guild_id" },
        ]
      },
    ]
  });
};
