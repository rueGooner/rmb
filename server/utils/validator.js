const { body, validationResult, check } = require('express-validator');

const userRegistrationValidators = () => {
  return [
    body('username', 'Username cannot be left empty').notEmpty(),
    body('username', 'Username must have more than 5 characters').isLength({ min: 5 }),
    body('email', 'Please provide a valid email address').isEmail(),
    body('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
    check('password_confirmation', 'the password confirmation field is required').isLength({ min: 1 }),
    body('password_confirmation').custom((value, { req }) => {
        if(value != req.body.password){
            throw new Error('Password confirmation does not match.');
        }
        return true;
    }),
  ]
}

const userLoginValidators = () => {
  return [
    body('email', 'Please provide a valid email address').isEmail(),
    body('password', 'Password must be at least 8 characters').isLength({ min: 8 })
  ]
}

const validate = (request, response, next) => {
  const errors = validationResult(request)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(error => extractedErrors.push({ [error.param]: error.msg }))

  return response.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  userRegistrationValidators,
  userLoginValidators,
  validate,
}
