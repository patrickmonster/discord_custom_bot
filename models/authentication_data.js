const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('authentication_data', {
    index_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "소유자",
      references: {
        model: 'authentication',
        key: 'index_count'
      }
    },
    donate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "금액"
    },
    point: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "포인트"
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "마지막 업데이트"
    },
    is_guild: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "N",
      comment: "길드 소유 여부"
    },
    target: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "위치 (길드\/개인)",
      unique: "authentication_data_UN"
    },
    parent_target: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "0",
      comment: "부모요소"
    }
  }, {
    sequelize,
    tableName: 'authentication_data',
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
      {
        name: "authentication_data_UN",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "target" },
        ]
      },
    ]
  });
};
