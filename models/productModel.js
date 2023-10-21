const mongoose = require("mongoose");

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
      ref: "Categoria",
      required: [true, "Por favor, ingresa una categoria para el producto"]
    },
    marca: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Marca",
      required: [true, "Por favor, ingresa una marca para el producto"]
    },
    modelo: {
      type: String,
      required: [true, "Por favor, ingresa un modelo para el producto"]
    },
    precio: {
      valor: {
        type: Number,
        required: [true, "Por favor, ingresa el precio del producto"]
      },
      moneda: {
        type: String,
        required: [true, "Por favor, ingresa la moneda del precio"]
      }
    },
    descuentos: [
      {
        tipo: {
          type: String,
          enum: ["porcentaje", "cantidad"], 
          required: [true, "Por favor, ingresa el tipo de descuento"]
        },
        valor: {
          type: Number,
          required: [true, "Por favor, ingresa el valor del descuento"]
        }
      }
    ],
    imagenes: [
      {
        url: {
          type: String,
          required: true
        },
        descripcion: {
          type: String,
          required: true
        }
      }
    ],
    rating: {
      rate: {
        type: Number,
        required: true
      },
      cantidad_valoraciones: {
        type: Number,
        required: true
      }
    },
    estock: {
      cantidad: {
        type: Number,
        required: true
      }
    },
    intereses_clientes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cliente"
      }
    ],
    fecha_modificacion: {
      type: Date,
      default: Date.now
    },
    usuario_modificacion: {
      type: String,
      required: true
    },
    detalles: {
      condicion: String,
      garantia: String,
      caracteristicas: String,
      formato: String,
      potencia: String,
      pais_origen: String,
      material: String,
      tipo_ensamblado: String,
      capacidad: String,
      material_cuchillas: String,
      peso: Number,
      profundidad: Number
    },
    activo:Boolean,
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model("productos", productSchema);

module.exports = Product;