const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recvie_command', {
    idx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "커맨드 명령(인터렉션)"
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      comment: "명령 이름 (영문\/띄워쓰기 x)"
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "설명"
    },
    default_permission: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "N",
      comment: "권한 여부"
    },
    type: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "1",
      comment: "입력방식 [1: 명령 2:사용자 3:메세지]"
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    parent_idx: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "부모 명령",
      references: {
        model: 'recvie_command',
        key: 'idx'
      }
    },
    use_yn: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "Y",
      comment: "사용여부"
    },
    use_cmd: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: "Y",
      comment: "커맨드 명령"
    },
    option_type: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "string",
      comment: "옵션값"
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    register_id: {
      type: DataTypes.STRING(150),
      allowNull: true,
      comment: "등록정보(등록된 고유 코드)",
      unique: "recvie_command_UN"
    },
    owner_idx: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "소유자",
      references: {
        model: 'token',
        key: 'idx'
      }
    },
    command: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "명령 실행코드"
    }
  }, {
    sequelize,
    tableName: 'recvie_command',
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
        name: "recvie_command_UN",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "register_id" },
        ]
      },
      {
        name: "recvie_command_owner_idx_IDX",
        using: "BTREE",
        fields: [
          { name: "owner_idx" },
        ]
      },
      {
        name: "recvie_command_parent_idx_IDX",
        using: "BTREE",
        fields: [
          { name: "parent_idx" },
        ]
      },
    ]
  });
};
