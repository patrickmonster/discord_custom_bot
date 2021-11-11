const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('authentication_token', {
    id: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      primaryKey: true,
      comment: "매칭 discord id"
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    twip: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "트윕"
    },
    toon: {
      type: DataTypes.STRING(40),
      allowNull: true,
      comment: "투네"
    },
    twip_token: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "트윕토큰"
    }
  }, {
    sequelize,
    tableName: 'authentication_token',
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
    ]
  });
};
