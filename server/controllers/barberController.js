const Models = require('../models/index');

/**
 * Creates a new barber at a shop based on the
 * shop ID.
 *
 * @function
 * @param {String} body.name - The name of the new barber.
 * @param {String} body.shopID - The Shop ID of the Barbershop.
 * @param {Object} response - HTTP Response object containing updated shop.
 */
const createBarber = async ({ body: { name, shopID }}, response) => {
  try {
    const newBarber = await Models.Barber.create({ name: name });
    const barberID = newBarber._id;
    const shop = await Models.Shop.findByIdAndUpdate(shopID,
      { $push: { barbers: barberID } },
      { new: true }
    );
    response.send({
      message: `New barber added to ${shop.name}`,
      shop,
    })
  } catch (error) {
    response.send(error.message);
  }
}

module.exports = {
  createBarber
};
