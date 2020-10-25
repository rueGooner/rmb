const express = require('express');

const barberController = require('../../controllers/barberController');

const router = express.Router();

router.route('/create').post(barberController.createBarber);

module.exports = router;
