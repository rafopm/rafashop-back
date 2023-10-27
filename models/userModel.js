const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombres: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [{
    type: String,
    enum: ['admin', 'seller', 'buyer'],
    default: ['buyer'], 
  }],
});

const User = mongoose.model('usuarios', userSchema);

module.exports = User;