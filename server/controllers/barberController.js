const { Model } = require('mongoose');
const Models = require('../models/index');

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
