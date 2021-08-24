"use strict";

const Car = require("../models/Cars");
const config = require("../config");
const Cars = require("../models/Cars");

/**
 * Find car details based on name
 * @param {String} name - The name of the Car
 * @return {Object} car - The matching Car object, null if not found
 */
const findCar = async (name) => {
  const cars = await Car.find({ name: name });
  return cars;
};

/**
 * Create a new Car object
 * @param {Object} request - The request object
 * @return {Object} token - The new Car object created, null if not created
 */
const createCar = async (request) => {
  const newCar = new Car({
    name: request.body.name,
    mpg: request.body.mpg,
    cylinders: request.body.cylinders,
    year: request.body.year,
    mpg: request.body.mpg,
    origin: request.body.origin,
    displacement: request.body.displacement,
    acceleration: request.body.acceleration,
    horsepower: request.body.horsepower,
    weight: request.body.weight,
  });
  const car = await newCar.save();
  return car;
};

/**
 * Get a list of existing Car object
 * @param {Object} request - The request object
 * @return {Object} tokens - The list of tokens, null if not found
 */
const listCars = async (request) => {
  const cars = await Car.find();
  return cars;
};

/**
 * Get details of the Car object
 * @param {Object} request - The request object
 * @return {Object} token - The matching Car object, null if not found
 */
const getCarDetails = async (request) => {
  const cars = await findCar(request.params.name);
  return cars;
};

/**
 * Delete the Car object
 * @param {Object} request - The request object
 * @return {Object} car - The deleted Car object, null if not found
 */
const deleteCar = async (request) => {
  const car = await Car.deleteOne({ _id: request.params.carId });
  return car;
};

module.exports.createCar = createCar;
module.exports.findCar = findCar;
module.exports.listCars = listCars;
module.exports.getCarDetails = getCarDetails;
module.exports.deleteCar = deleteCar;
