const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recive_event', {
    idx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'token',
        key: 'idx'
      }
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "이벤트명"
    }
  }, {
    sequelize,
    tableName: 'recive_event',
    timestamps: false,
    indexes: [
      {
        name: "recive_event_idx_IDX",
        using: "BTREE",
        fields: [
          { name: "idx" },
        ]
      },
    ]
  });
};
