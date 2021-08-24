"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate");
const config = require("../config");

/**
 * Create schema definition for Car object
 */
var carSchema = new Schema({
  name: {
    type: String,
    min: config.NAME_MIN_LENGHT,
    max: config.NAME_MAX_LENGHT,
  },

  year: {
    type: Date,
    required: "Make year is mandatory",
  },

  origin: {
    type: String,
    min: config.ORIGIN_MIN_LENGHT,
    max: config.ORIGIN_MIN_LENGHT,
    required: "Origin is mandatory",
  },

  mpg: {
    type: Number,
    required: "miles per gallon is mandatory",
  },

  cylinders: {
    type: Number,
    required: "Cylinders is mandatory",
  },

  horsepower: {
    type: Number,
    required: "Horsepower is mandatory",
  },

  weight: {
    type: Number,
    required: "Weight is mandatory",
  },

  acceleration: {
    type: Number,
    required: "Acceleration is mandatory",
  },

  displacement: {
    type: Number,
    required: "Displacement is mandatory",
  },
});

carSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Cars", carSchema);
