const Category = require('../models/categoryModel')
const asyncHandler = require('express-async-handler')

const getCategories = asyncHandler(async(req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const getCategory = asyncHandler(async(req, res) =>{
    try {
        const {id} = req.params;
        const category = await Category.findById(id);
        res.status(200).json(category);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const createCategory = asyncHandler(async(req, res) => {
    try {
        const category = await Category.create(req.body)
        res.status(200).json(category);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const updateCategory = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const category = await Category.findByIdAndUpdate(id, req.body);
        
        if(!category){
            res.status(404);
            throw new Error(`No se pudo encontrar una categoría con ID ${id}`);
        }
        const updatedCategory = await Category.findById(id);
        res.status(200).json(updatedCategory);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true } 
        );
        
        if (!updatedCategory) {
            res.status(404);
            throw new Error(`No se pudo encontrar una categoría con ID ${id}`);
        }
        
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}