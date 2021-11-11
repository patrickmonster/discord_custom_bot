const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('youtube_tokens', {
    youtube_id: {
      type: DataTypes.CHAR(24),
      allowNull: false
    },
    youtube_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    index_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    expires_in: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "잔여시간"
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    client_id: {
      type: DataTypes.CHAR(75),
      allowNull: true
    },
    secret: {
      type: DataTypes.CHAR(25),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'youtube_tokens',
    timestamps: true,
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
        name: "youtube_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "youtube_id" },
        ]
      },
      {
        name: "refresh_token",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "refresh_token", length: 103 },
        ]
      },
    ]
  });
};
