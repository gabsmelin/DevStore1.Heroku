import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _tb_login from  "./tb_login.js";
import _tb_produto from  "./tb_produto.js";

export default function initModels(sequelize) {
  var tb_login = _tb_login.init(sequelize, DataTypes);
  var tb_produto = _tb_produto.init(sequelize, DataTypes);


  return {
    tb_login,
    tb_produto,
  };
}
