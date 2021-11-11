const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('crew', {
    guid_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      comment: "길드 id"
    },
    inv_code: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    use_yn: {
      type: DataTypes.STRING(2),
      allowNull: true,
      comment: "y\/n"
    }
  }, {
    sequelize,
    tableName: 'crew',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "guid_id" },
        ]
      },
    ]
  });
};
