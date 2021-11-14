const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recvie_intent', {
    idx: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'recvie_intent',
    timestamps: false,
    indexes: [
      {
        name: "recvie_intent_idx_IDX",
        using: "BTREE",
        fields: [
          { name: "idx" },
        ]
      },
    ]
  });
};
