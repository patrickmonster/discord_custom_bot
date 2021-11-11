const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('donation_log', {
    index_count: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "카운트"
    },
    donate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "금액"
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "도네이션 일자"
    },
    target: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      comment: "위치 (길드\/개인)"
    },
    user_id: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      comment: "후원사용자"
    }
  }, {
    sequelize,
    tableName: 'donation_log',
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
