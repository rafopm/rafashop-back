const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "Por favor, ingresa un nombre para la categoria"]
    },
    fecha_modificacion: {
      type: Date,
      default: Date.now
    },
    usuario_modificacion: {
      type: String,
      required: true
    },
    activo:Boolean,
  },
  {
    timestamps: true
  }
);

const Category = mongoose.model("categorias", categorySchema);

module.exports = Category;