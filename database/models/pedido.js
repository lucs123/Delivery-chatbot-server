/* jshint indent: 2 */
const {DataTypes} = require('sequelize')

module.exports = function(sequelize) {
  return sequelize.define('pedidos', {
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
      allowNull: false
    },
    formaentrega: {
      type: DataTypes.STRING,
      allowNull: false
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pedidos',
    schema: 'public'
    });
};

