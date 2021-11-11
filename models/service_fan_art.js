const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('service_fan_art', {
    index_count: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    channel: {
      type: DataTypes.CHAR(20),
      allowNull: false
    },
    user_id: {
      type: DataTypes.CHAR(20),
      allowNull: false
    },
    msg_id: {
      type: DataTypes.CHAR(30),
      allowNull: false,
      unique: "msg_id"
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    is_yn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'service_fan_art',
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
        name: "msg_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "msg_id" },
        ]
      },
    ]
  });
};
