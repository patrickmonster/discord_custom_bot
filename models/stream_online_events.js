const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stream_online_events', {
    id: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      comment: "스트림_id"
    },
    broadcaster_user_id: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      primaryKey: true
    },
    started_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'stream_online_events',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "broadcaster_user_id" },
        ]
      },
    ]
  });
};
