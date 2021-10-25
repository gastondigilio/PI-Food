const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID, //genera num random con letras y numeros que es unico y especifico que no se va a repetir
      defaultValue: DataTypes.UUIDV4, //numero generado aleatoriamente
      allowNull: false, // no te permito que este vacio este campo, si estuviera en true si me autorizaria a que este vacio
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      // allowNull: true,
    },
    summary: {
      type: DataTypes.STRING,
    },
    puntuacion: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nivelDeComidaSaludable: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pasoAPaso: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN, // se crea para facilitar la busqueda en la base de datos cuando yo creo un plato de comidas
      allowNull: false,
      defaultValue: true
    }
  });
};
