const express = require('express');

const barberController = require('../../controllers/barberController');

const router = express.Router();

router.route('/fake').post(barberController.addFakeBarbers);

module.exports = router;
