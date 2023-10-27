const express = require('express');
//const User = require('../models/userModel');
const { getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser
} = require('../controllers/UserController')

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUser);


router.post('/', createUser);

// update a product
router.put('/:id', updateUser);

// delete a product

router.delete('/:id', deleteUser);

router.post('/login', loginUser);

module.exports = router;