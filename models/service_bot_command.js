const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('service_bot_command', {
    index_count: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    in_command: {
      type: DataTypes.CHAR(20),
      allowNull: false
    },
    out_command: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    guild_id: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      comment: "길드 고유 id"
    },
    is_yn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "음소거"
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
    call_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'service_bot_command',
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
        name: "in_command",
        type: "FULLTEXT",
        fields: [
          { name: "in_command" },
        ]
      },
    ]
  });
};
