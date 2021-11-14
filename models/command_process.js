const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('command_process', {
    idx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'command',
        key: 'idx'
      }
    },
    comm: {
      type: DataTypes.JSON,
      allowNull: true
    },
    parent: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: -1,
      references: {
        model: 'command_process',
        key: 'idx'
      }
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'command_process',
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
        name: "command_process_parent_IDX",
        using: "BTREE",
        fields: [
          { name: "parent" },
        ]
      },
    ]
  });
};
