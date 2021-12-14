const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recvie_event', {
    idx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "봇 idx",
      references: {
        model: 'token',
        key: 'idx'
      }
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "이벤트명"
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "생성일자"
    },
    exec: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "실행명령"
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "수정일자"
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
