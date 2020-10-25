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
 *
 * @param {Object} request The HTTP Request Object.
 * @param {*} response
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
