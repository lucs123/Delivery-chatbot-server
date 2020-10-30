/* jshint indent: 2 */
const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('pedidos', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pedido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valor: {
      type: DataTypes.STRING,
      allowNull: true
    },
    formaentrega: {
      type: DataTypes.STRING,
      allowNull: true
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pedidos',
    schema: 'public'
    });
}
