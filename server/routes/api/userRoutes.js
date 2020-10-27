const express = require('express');
const { userLoginValidators, userRegistrationValidators, validate } = require('../../utils/validator.js')
const userController = require('../../controllers/userController');

const router = express.Router();

router.route('/register').post(userRegistrationValidators(), validate, userController.register);
router.route('/login').post(userLoginValidators(), validate, userController.login);
module.exports = router;