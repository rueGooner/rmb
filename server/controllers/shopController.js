const Models = require('../models/index');
const faker = require('faker/locale/en_GB');

const createFakeBarbers = async (number) => {
  let barbers = [];
  for (let index = 0; index < number; index++) {
    const barber = await Models.Barber.create({ name: `${faker.name.firstName()} ${faker.name.lastName()}`, });
    barbers.push(barber);
  }
  barberIDs = barbers.map(a => a._id);
  return barberIDs;
}

/**
 * Adds fake shops to the DB.
 *
 * @param {*} request
 * @param {*} response
 */
const addFakeShops = async (request, response) => {
  try {
    let shops = [];
    for (let index = 0; index < 100; index++) {
      shops.push({
        name: `${faker.company.companyName()} Hair`,
        location: `${faker.address.city()}`,
        telephoneNumber: faker.phone.phoneNumber(),
        appointmentOnly: faker.random.boolean(),
        barbers: await createFakeBarbers(faker.random.number({ min: 1, max: 6 }))
      });
    }

    const fakeShops = await Models.Shop.create(shops);
    response.send({
      message: 'Fake Shops Created',
      fakeShops,
    });
  } catch (error) {
    response.send(error);
  }
};

/**
 * Fetches a single barber shop by it's ID and returns the document including the current barbers.
 *
 * @function
 * @param {Object} request The HTTP Request Object.
 * @param {String} request.params.id - The Shop ID parameter.
 * @param {Object} response The HTTP Response Object.
 * @returns {Object} - Returns the shop and it's barbers.
 */
const fetchBarberShop = async (request, response) => {
  try {
    const { id } = request.params;
    const barberShop = await Models.Shop.findById(id).populate('barbers');
    response.send({
      status: 'Team Loaded',
      barberShop,
    });
  } catch (error) {
    response.status(404).send(error.message);
  }
}

module.exports = {
  addFakeShops,
  fetchBarberShop
};
