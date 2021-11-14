const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('command', {
    idx: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
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
    },
    type: {
      type: DataTypes.STRING(2),
      allowNull: true,
      defaultValue: "ms",
      comment: "bt,ms,mu"
    },
    owner: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "소유주"
    },
    guild: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "해당길드"
    },
    use_yn: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "Y",
      comment: "'Y'"
    }
  }, {
    sequelize,
    tableName: 'command',
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
        name: "command_name_IDX",
        type: "FULLTEXT",
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};
