const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('live_on_channels', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "id값"
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    target_channel: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "알림채널"
    },
    error_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    custom_ment: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "커스텀 맨트"
    }
  }, {
    sequelize,
    tableName: 'live_on_channels',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "user_name",
        using: "BTREE",
        fields: [
          { name: "user_name" },
        ]
      },
    ]
  });
};
