const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')

const getProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({})
            .populate('marca', 'nombre')
            .populate('categoria', 'nombre');
        res.status(200).json(products);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const getProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
            .populate('marca', 'nombre')
            .populate('categoria', 'nombre');
        res.status(200).json(product);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const createProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const updateProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            res.status(404);
            throw new Error(`No se pudo encontrar un producto con ID ${id}`);
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true }
        );

        if (!updatedProduct) {
            res.status(404);
            throw new Error(`No se pudo encontrar un producto con ID ${id}`);
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}