const Models = require('../models/index');
const faker = require('faker');

/**
 * Function to add fake barbers into the DB.
 *
 * @param {*} request
 * @param {*} response
 */
const addFakeBarbers = async (request, response) => {
  try {
    let barbers = [];
    for (let index = 0; index < 1; index++) {
      barbers.push({
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      });
    }

    const fakeBarbers = await Models.Barber.create(barbers);
    // response.status(201).json({
    //   message: 'Fake Barbers Created',
    //   fakeBarbers,
    // });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addFakeBarbers,
  createBarber
};
