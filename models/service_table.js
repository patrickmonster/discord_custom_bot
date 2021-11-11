const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('service_table', {
    index_count: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    discord_id: {
      type: DataTypes.CHAR(20),
      allowNull: true
    },
    target_channel: {
      type: DataTypes.CHAR(20),
      allowNull: false
    },
    service_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    is_yn: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "1"
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'service_table',
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
