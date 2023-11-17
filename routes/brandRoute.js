const express = require('express');

const { getBrands,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand } = require('../controllers/brandController')

const router = express.Router();

router.get('/', getBrands);

router.get('/:id', getBrand);

router.post('/', createBrand);

router.put('/:id', updateBrand);

router.delete('/:id', deleteBrand);

module.exports = router;