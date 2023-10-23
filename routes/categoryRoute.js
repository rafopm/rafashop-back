const express = require('express');
const Category = require('../models/categoryModel');
const { getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory } = require('../controllers/categoryController')

const router = express.Router();

router.get('/', getCategories);

router.get('/:id', getCategory);


router.post('/', createCategory);

// update a product
router.put('/:id', updateCategory);

// delete a product

router.delete('/:id', deleteCategory);

module.exports = router;