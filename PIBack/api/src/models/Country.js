const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    id:{
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    continent:{
      type: DataTypes.STRING,
      defaultValue: "unknown",
      allowNull: true,
    },
    capital:{
      type: DataTypes.STRING,
      defaultValue: "unknown",
      allowNull: true,
    },
    subregion:{
      type: DataTypes.STRING,
      defaultValue: "unknown",
      allowNull: true,
    },
    area:{
      type: DataTypes.FLOAT,
      // allowNull: false,
    },
    lat:{
      type: DataTypes.FLOAT,
      // allowNull: false,
    },
    long:{
      type: DataTypes.FLOAT,
      // allowNull: false,
    },
    population:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    flag:{
      type: DataTypes.STRING,
      defaultValue: "https://flagcdn.com/w320/kg.png",
    },
  },{
    timestamps: false,
    allowNull: false,
  });
};
