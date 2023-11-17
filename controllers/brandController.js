const Brand = require('../models/brandModel');
const asyncHandler = require('express-async-handler');

const getBrands = asyncHandler(async (req, res) => {
  try {
    const brand = await Brand.find({});
    res.status(200).json(brand);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const getBrand = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    res.status(200).json(brand);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const createBrand = asyncHandler(async (req, res) => {
  try {
    const brand = await Brand.create(req.body);
    res.status(200).json(brand);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const updateBrand = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findByIdAndUpdate(id, req.body);

    if (!brand) {
      res.status(404);
      throw new Error(`No se pudo encontrar una marca con ID ${id}`);
    }

    const updatedBrand = await Brand.findById(id);
    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const deleteBrand = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      { activo: false },
      { new: true }
    );

    if (!updatedBrand) {
      res.status(404);
      throw new Error(`No se pudo encontrar una marca con ID ${id}`);
    }

    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
};