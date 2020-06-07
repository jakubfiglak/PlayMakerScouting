const geocoder = require('../utils/geocoder');

async function geocode(next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    voivodeship: loc[0].stateCode,
    zipcode: loc[0].zipcode,
  };

  this.address = undefined;

  next();
}

module.exports = geocode;
