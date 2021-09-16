import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tb_login extends Model {
  static init(sequelize, DataTypes) {
  super.init({
    id_usuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "primary key"
    },
    nm_usuario: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ds_login: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ds_senha: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    img_usuario: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_login',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_usuario" },
        ]
      },
    ]
  });
  return tb_login;
  }
}
