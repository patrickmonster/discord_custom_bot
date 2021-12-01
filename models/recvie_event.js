const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recvie_event', {
    idx: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'recvie_event',
    timestamps: false,
    indexes: [
      {
        name: "recvie_event_idx_IDX",
        using: "BTREE",
        fields: [
          { name: "idx" },
        ]
      },
    ]
  });
};
