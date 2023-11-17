const mongoose = require("mongoose");

const brandSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "Por favor, ingresa un nombre para la marca"]
    },
    fecha_modificacion: {
      type: Date,
      default: Date.now
    },
    usuario_modificacion: {
      type: String,
      required: true
    },

  },
  {
    timestamps: true
  }
);

const Brand = mongoose.model("marcas", brandSchema);

module.exports = Brand;