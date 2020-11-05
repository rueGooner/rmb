/**
 * @module userController
 */
const Models = require('../models/index');
const { genSalt, compare, hash } = require("bcryptjs");
const { createUserToken } = require('../utils/auth');

/**
 * Takes the user inputted data and creates a new user
 * against the USER model within the db.
 *
 * @function
 * @param {Object} request
 * @param {Object} response
 * @param {String} request.body.username The Users name.
 * @param {String} request.body.email The Users email address.
 * @param {String} request.body.password The Users password.
 * @returns {String} Returns message on success.
 */
const register = async ({ body: { username, email, password, role } }, response) => {
  try {
    let user = await Models.User.findOne({ email });
    if (user) response.status(400).json({ message: "User Already Exists" });

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    user = new Models.User({
      username,
      email,
      role,
      password: hashedPassword
    });

    await user.save()

    response.status(201).send({
      message: 'User Registration was successful'
    });
  } catch (error) {
    console.error(error);
    response.send(error.message);
  }
}

/**
 * Takes an email string and a password string from
 * the form submission and retrieves the user matching
 * the email and compares the hashed password. Will login
 * successfully if the compared passwords match.
 *
 * @function
 * @param {Object} request
 * @param {Object} response
 * @param {String} request.body.email The Users email address.
 * @param {String} request.body.password The Users password.
 * @returns {Object} Returns the user and token.
 */
const login = async ({ body: { email, password } }, response) => {
  try {
    let user = await Models.User.findOne({ email });
    if (!user) response.status(400).json({ message: "No user matches this email address" });
    const passwordsMatch = await compare(password, user.password);
    if (!passwordsMatch) response.status(400).json({ message: "Incorrect Password!" });
    const token = await createUserToken(user.id, process.env.SECRET);
    response.status(200).json({
      message: 'Login successful',
      token,
      user,
    })
  } catch (error) {
    response.json({
      message: error.message
    });
  }
}

module.exports = {
  register,
  login,
};
