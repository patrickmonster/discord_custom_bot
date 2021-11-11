const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('live_stream_upload', {
    youtube_id: {
      type: DataTypes.CHAR(24),
      allowNull: false,
      primaryKey: true,
      comment: "youtube 토큰",
      references: {
        model: 'youtube_tokens',
        key: 'youtube_id'
      }
    },
    twitch_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "트위치 고유 id",
      references: {
        model: 'live_on_monits',
        key: 'user_id'
      },
      unique: "live_stream_upload_ibfk_2"
    },
    context: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "사용자 자동 제목 형식"
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "잔여 횟수"
    }
  }, {
    sequelize,
    tableName: 'live_stream_upload',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "youtube_id" },
        ]
      },
      {
        name: "twitch_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "twitch_id" },
        ]
      },
    ]
  });
};
