'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    clientName: DataTypes.STRING,
    tableNumber: DataTypes.DECIMAL,
    status: DataTypes.STRING
  }, {});
  orders.associate = function(models) {
    // associations can be defined here
  };
  return orders;
};