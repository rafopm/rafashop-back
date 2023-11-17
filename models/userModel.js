const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombres: {
    type: String,
    required: [true, "Por favor, ingresa los nombres del usuario"]
  },
  apellidos: {
    type: String,
    required:  [true, "Por favor, ingresa los apellidos del usuario"]
  },
  dni: {
    type: String,
    required:  [true, "Por favor, ingresa el DNI del usuario"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Por favor, ingresa el Email del usuario"],
    unique: true,
  },
  password: {
    type: String,
    required:  [true, "Por favor, ingresa la contraseña del usuario"],
  },
  rol: {
    type: String,
    required:  [true, "Por favor, ingresa el rol del usuario"],
  },
});

const User = mongoose.model('usuarios', userSchema);

module.exports = User;