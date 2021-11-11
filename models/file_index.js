const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('file_index', {
    uuid: {
      type: DataTypes.CHAR(40),
      allowNull: false,
      primaryKey: true
    },
    parent_uuid: {
      type: DataTypes.CHAR(40),
      allowNull: true
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.CHAR(20),
      allowNull: false
    },
    id: {
      type: DataTypes.CHAR(40),
      allowNull: false,
      unique: "id"
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    lenght_time: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'file_index',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "uuid" },
        ]
      },
      {
        name: "id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
