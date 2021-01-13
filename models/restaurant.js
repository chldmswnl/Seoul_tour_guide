const mongoose = require("mongoose");
const restaurants = require("../data/restaurant");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  location: { type: String, required: true },
  location_map: { type: String, required: true },
  img: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  hours: { type: String, required: true },
  description: { type: String, required: true },
  dollar_sign: { type: String, required: true },
});

const Restaurant = mongoose.model("restaurant", restaurantSchema);

Restaurant.find().count({}, (err, count) => {
  if (count === 0) {
    Restaurant.insertMany(restaurants);
  } else {
    console.log("Data is already loaded");
  }
});
module.exports = Restaurant;
