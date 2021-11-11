const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('authentication', {
    code: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    index_count: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id: {
      type: DataTypes.CHAR(20),
      allowNull: true,
      comment: "discord 고유ID",
      unique: "id"
    },
    guild_id: {
      type: DataTypes.CHAR(20),
      allowNull: true,
      comment: "스트리머이면(해당길드 소유주)",
      unique: "guild_id"
    },
    twitch_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: "트위치 고유 id"
    },
    twitch_login: {
      type: DataTypes.CHAR(30),
      allowNull: true
    },
    twip_id: {
      type: DataTypes.CHAR(20),
      allowNull: true
    },
    toon_id: {
      type: DataTypes.CHAR(40),
      allowNull: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    broadcaster_type: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      defaultValue: "user"
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    user_type: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0",
      comment: "유저타입 (0:일반\/스머 1:크루 2:커뮤니티)"
    },
    use_bot: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "N",
      comment: "봇 사용여부 채널일때 채널ID"
    }
  }, {
    sequelize,
    tableName: 'authentication',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "index_count" },
        ]
      },
      {
        name: "id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "guild_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "guild_id" },
        ]
      },
    ]
  });
};
