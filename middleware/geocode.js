const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

async function geocode(next) {
  if (this.address) {
    const { street, streetNo, zipcode, city } = this.address;
    const addressString = `${street} ${streetNo}, ${zipcode} ${city}`;
    const loc = await geocoder.geocode(addressString);
    this.location = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      voivodeshipSlug: slugify(loc[0].stateCode, { lower: true }),
    };
  }
  // this.address = undefined;

  next();
}

module.exports = geocode;
