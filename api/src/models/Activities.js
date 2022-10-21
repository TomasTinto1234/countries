const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activities', {
      name:{
       type: DataTypes.STRING,
      },
      dificultad: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      validate : {
        min: 1,
        max: 5,
        isEven(value) {
          if(value < 1 || value > 5) {
            throw new Error("La dificultad debe ser entre 1 y 5")
          }
        }
      }
      },
      duracion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      },

      temportada: {
      type: DataTypes.ENUM("Verano, Otoño, Invierno, Primavera")
      },
    } , {
      timestamps: false
  });
};