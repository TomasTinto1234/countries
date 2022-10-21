const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "countries",
    {
      id: {
        type: DataTypes.STRING(3), // (UUID) numero randon unico
        allowNull: false, // no te permito que este vacio, es un campo requerido
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowSymlinks: false,
      },

      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      continents: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      capital: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      subregion: {
        type: DataTypes.STRING,
      },

      area: {
        type: DataTypes.STRING,
      },

      population: {
        type: DataTypes.STRING,
      },

      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
