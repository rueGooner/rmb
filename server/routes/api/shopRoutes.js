const express = require('express');

const shopController = require('../../controllers/shopController');

const router = express.Router();

router.route('/').get(shopController.fetchShops);
router.route('/:id').get(shopController.fetchBarberShop);
router.route('/fake').post(shopController.addFakeShops);

module.exports = router;
