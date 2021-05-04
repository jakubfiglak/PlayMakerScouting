const Rating = require('./rating.model');

async function createRating(ratingData) {
  const rating = await Rating.create(ratingData);
  return rating;
}

async function getAllRatings(accessFilters) {
  const ratings = await Rating.find({ ...accessFilters });
  return ratings;
}

function getRatingById(id) {
  return Rating.findById(id);
}

async function updateRating({ rating, reqBody }) {
  const editedRating = rating;

  Object.keys(reqBody).forEach((key) => {
    if (reqBody[key]) {
      editedRating[key] = reqBody[key];
    }
  });

  const modifiedRating = await editedRating.save();

  return modifiedRating;
}

function deleteRating(rating) {
  return rating.remove();
}

module.exports = { createRating, getAllRatings, getRatingById, updateRating, deleteRating };
