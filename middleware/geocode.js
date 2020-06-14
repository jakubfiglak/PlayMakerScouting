const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

async function geocode(next) {
  if (this.address) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress,
      street: loc[0].streetName,
      city: loc[0].city,
      voivodeship: loc[0].stateCode,
      zipcode: loc[0].zipcode,
      voivodeshipSlug: slugify(loc[0].stateCode, { lower: true }),
    };
  }
  this.address = undefined;

  next();
}

module.exports = geocode;
