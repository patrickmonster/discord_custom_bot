const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('authentication_child', {
    index_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    guild_id: {
      type: DataTypes.CHAR(20),
      allowNull: false
    },
    user_id: {
      type: DataTypes.CHAR(20),
      allowNull: false
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    is_subscription: {
      type: DataTypes.CHAR(2),
      allowNull: true,
      defaultValue: "N",
      comment: "사용자 구독 여부(구독했다면 개월)"
    },
    is_mode: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "N",
      comment: "사용자가 매니져인지 여부"
    }
  }, {
    sequelize,
    tableName: 'authentication_child',
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
