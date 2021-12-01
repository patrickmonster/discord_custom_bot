const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('token', {
    idx: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    token: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "토큰"
    },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    memo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    tag: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: "token_UN"
    },
    use_yn: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "Y"
    },
    log_level: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 3,
      comment: "로그 레벨"
    },
    root_yn: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "N"
    }
  }, {
    sequelize,
    tableName: 'token',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idx" },
        ]
      },
      {
        name: "token_UN",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tag" },
        ]
      },
    ]
  });
};
