const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('guild_register', {
    guild_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    invite: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "초대링크",
      unique: "guild_register_UN"
    },
    state: {
      type: DataTypes.STRING(1),
      allowNull: true,
      comment: "결제 상태값(0: 등록 1:크루 2:커뮤니티)"
    },
    owner_id: {
      type: DataTypes.CHAR(20),
      allowNull: true,
      comment: "길드 소유자"
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    reg_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: "등록개수"
    },
    target_channel: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "알림채널"
    }
  }, {
    sequelize,
    tableName: 'guild_register',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "guild_id" },
        ]
      },
      {
        name: "guild_register_UN",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "invite" },
        ]
      },
    ]
  });
};
