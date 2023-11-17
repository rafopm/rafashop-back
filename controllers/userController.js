const User = require('../models/UserModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const getUsers = asyncHandler(async(req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const getUser = asyncHandler(async(req, res) =>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const createUser = asyncHandler(async (req, res) => {
    try {
      console.log(req.body)
      const { password } = req.body;
  
      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crear el usuario con la contraseña hasheada
      const user = await User.create({ ...req.body, password: hashedPassword });
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });

  const updateUser = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const { password } = req.body;
  
      // Hashear la nueva contraseña si se proporciona
      if (password) {
        req.body.password = await bcrypt.hash(password, 10);
      }
  
      const user = await User.findByIdAndUpdate(id, req.body);
  
      if (!user) {
        res.status(404);
        throw new Error(`No se pudo encontrar un usuario con ID ${id}`);
      }
  
      const updatedUser = await User.findById(id);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500);
      throw new Error(error.message);
    }
  });

const deleteUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true } 
        );
        
        if (!updatedUser) {
            res.status(404);
            throw new Error(`No se pudo encontrar un usuario con ID ${id}`);
        }
        
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    // Buscar el usuario por su dirección de correo electrónico
    const user = await User.findOne({ email });
  
    // Verificar si el usuario existe y la contraseña es válida
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generar un token JWT para el usuario
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '24h', // El token expira en 1 hora, puedes ajustar este valor según tus necesidades
      });
  
      res.status(200).json({
        _id: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        rol: user.rol,
        token: token,
      });
      console.log(token)
    } else {
      // Si las credenciales son inválidas, enviar un mensaje de error
      res.status(401);
      throw new Error('Credenciales inválidas. Por favor, verifica tu correo electrónico y contraseña.');
    }
  });

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser
}