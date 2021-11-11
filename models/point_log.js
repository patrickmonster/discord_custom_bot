const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('point_log', {
    id: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      primaryKey: true
    },
    point: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_cash: {
      type: DataTypes.CHAR(2),
      allowNull: false,
      defaultValue: "N"
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'point_log',
    timestamps: false
  });
};
