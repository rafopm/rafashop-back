const mongoose = require("mongoose");
// const Category = require("./categoryModel");
// const Brand = require("./brandModel");

const productSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "Por favor, ingresa un nombre para el producto"]
    },
    descripcion: {
      type: String,
      required: [true, "Por favor, ingresa una descripción para el producto"]
    },
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categorias",
      required: [true, "Por favor, ingresa una categoria para el producto"]
    },
    marca: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "marcas",
      required: [true, "Por favor, ingresa una marca para el producto"]
    },
    modelo: {
      type: String,
      required: [true, "Por favor, ingresa un modelo para el producto"]
    },
    precio: {
        type: Number,
        required: [true, "Por favor, ingresa el precio del producto"]
    },
    descuentos:
    {
      type: Number,
    },
    imagenes: [
      {
        url: {
          type: String,
        },
        descripcion: {
          type: String,
        }
      }
    ],
    rating: {
      rate: {
        type: Number,
      },
      cantidad_valoraciones: {
        type: Number,
      }
    },
    stock:
    {
      type: Number,
    },

    intereses_clientes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cliente"
      }
    ],
    usuario_modificacion: {
      type: String,
    },
    detalles: {
      type: String,
    },
    informacion_adicional: {
      type: String,
    },
    activo: Boolean,
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("productos", productSchema);

module.exports = Product;