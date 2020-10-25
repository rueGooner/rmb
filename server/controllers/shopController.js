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
 * @param {String} params.id - The Shop ID parameter.
 * @param {Object} response The HTTP Response Object.
 * @returns {Object} - Returns the shop and it's barbers.
 */
const fetchBarberShop = async ({ params: { id } }, response) => {
  try {
    const barberShop = await Models.Shop.findById(id).populate('barbers');
    response.send({
      status: 'Team Loaded',
      barberShop,
    });
  } catch (error) {
    response.status(404).send(error.message);
  }
}

/**
 * Fetches a list of barbershops, with a configurable limit,
 * can be filtered by shop name.
 *
 * @function
 * @param {Object} request The HTTP Request Object.
 * @param {Object} response The HTTP Response Object.
 * @returns {Array} - Returns the list of barbershops.
 * @throws {String} - Error message if fetching shops fail.
 */
const fetchShops = async (request, response) => {
  try {
    const { page, limit, search } = request.query;
    let query = {};

    if (search) {
      const reg = new RegExp('.*' + search + '.*', 'i');
      query = { name: reg };
    }

    const skip = (page - 1) * limit || 0;

    const shopCount = await Models.Shop.find(query).countDocuments();
    const shops = await Models.Shop.find(query)
      .skip(parseInt(skip, 10))
      .limit(parseInt(15, 10));

      console.log(shopCount);

    response.status(200).json({
      pages: Math.round(shopCount / 15) > 1 ? Math.round(shopCount / 15) : 1,
      shops,
    });
  } catch (error) {
    response.status(404).send(error.message);
  }
}

/**
 * Find and remove a barberhop by it's ID.
 *
 * @param {String} params.id - The Barbershop ID string parameter
 * @param {*} response - Http Response Object
 * @returns {String} - Message upon successful deletion of shop.
 * @throws {String} - Message if error cannot be deleted.
 */
const deleteShop = async ({ params: { id }}, response) => {
  try {
    await Models.Shop.findByIdAndDelete(id);
    response.json({
      message: `Barbershop ${id} deleted successfully.`,
    });
  } catch (error) {
    response.json({
      message: `Cannot find Barbershop with ID ${id}`,
    });
  }
}

module.exports = {
  addFakeShops,
  fetchBarberShop,
  fetchShops,
  deleteShop,
};
