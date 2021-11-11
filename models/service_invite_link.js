const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('service_invite_link', {
    index_count: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    guild_id: {
      type: DataTypes.CHAR(20),
      allowNull: false
    },
    code: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    service_type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    channel_id: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "채널 ID"
    }
  }, {
    sequelize,
    tableName: 'service_invite_link',
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
    ]
  });
};
