const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('discord_community', {
    index_count: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "커뮤니티 인덱스"
    },
    guild_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      comment: "길드 id"
    },
    own_id: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "소유자 id"
    },
    own_tag: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "소유자 tag"
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "생성시간"
    },
    inv_link: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "초대링크"
    },
    guild_type: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "0",
      comment: "길드타입(0:스트리머 1:크루 2:커뮤니티)"
    }
  }, {
    sequelize,
    tableName: 'discord_community',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "guild_id" },
        ]
      },
      {
        name: "discord_community_UN",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "index_count" },
          { name: "inv_link" },
        ]
      },
    ]
  });
};
