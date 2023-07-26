const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Activity', {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficult:{
      type: DataTypes.STRING,
      defaultValue: "Easy",
    },
    duration:{
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    season:{
      type: DataTypes.STRING,
      // allowNull: false,
    },
    countries:{
      type: DataTypes.JSON,
      // allowNull: false,
    },
  },{
    timestamps: false,
    allowNull: false,
  });
};
