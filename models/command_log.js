const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('command_log', {
    guild: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "DM",
      comment: "길드 id - DM은 'DM' 표기"
    },
    channel: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "채널ID"
    },
    user: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "유저ID"
    },
    command: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "명령문"
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "생성시간"
    },
    type: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "T",
      comment: "메세지 타입\r\n\tT : 텍스트(맨션)\r\n\tB : 버튼\r\n\tM: 매뉴\r\n\tA : 어플리케이션\r\n\tO : AutoComplete\r\n\tC : 커맨드\r\n\tP : 메세지 컴포넌트"
    },
    idx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'token',
        key: 'idx'
      }
    }
  }, {
    sequelize,
    tableName: 'command_log',
    timestamps: false,
    indexes: [
      {
        name: "command_log_guild_IDX",
        using: "BTREE",
        fields: [
          { name: "guild" },
        ]
      },
      {
        name: "command_log_channel_IDX",
        using: "BTREE",
        fields: [
          { name: "channel" },
        ]
      },
      {
        name: "command_log_user_IDX",
        using: "BTREE",
        fields: [
          { name: "user" },
        ]
      },
      {
        name: "command_log_idx_IDX",
        using: "BTREE",
        fields: [
          { name: "idx" },
        ]
      },
    ]
  });
};
