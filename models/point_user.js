const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('point_user', {
    index_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    point: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0
    },
    cash: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "is_gt가 N일경우 타겟 twitch_id"
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    is_gt: {
      type: DataTypes.CHAR(2),
      allowNull: false,
      defaultValue: "Y"
    }
  }, {
    sequelize,
    tableName: 'point_user',
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
    ]
  });
};
