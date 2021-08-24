"use strict";

const router = require("express").Router();
const carController = require("../controllers/cars");
const validation = require("../middleware/validation");

// Import Car model
const Car = require("../models/Cars");

/**
 * @swagger
 * /api/car/create:
 *   post:
 *     summary: "Creates a new entry for the car"
 *     description: "This endpoint will add a Car to db"
 *     tags:
 *       - Car
 *     consumes:
 *     - "application/json"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "name"
 *       in: "name"
 *       required: true
 *     - name: "origin"
 *       in: "origin"
 *       required: true
 *     - name: "year"
 *       in: "year"
 *       required: true
 *     - name: "mpg"
 *       in: "mpg"
 *       required: true
 *     - name: "acceleration"
 *       in: "acceleration"
 *       required: true
 *     - name: "displacement"
 *       in: "displacement"
 *       required: true
 *     - name: "weight"
 *       in: "weight"
 *       required: true
 *     - name: "horsepower"
 *       in: "horsepower"
 *       required: true
 *     - name: "cylinders"
 *       in: "cylinders"
 *       required: true
 *     responses:
 *       200:
 *         description: "Car created"
 *       400:
 *         description: "Invalid request parameters"
 *       403:
 *         description: "Invalid JWT Token"
 *       500:
 *         description: "Failed to create Car"
 *       404:
 *         description: "Invalid endpoint"
 */
router.post(
  "/car/create",
  validation.requestAuthentication,
  async (request, response) => {
    // Validate request body
    const { error } = validation.carInputDataValidation(request.body);
    if (error) return response.status(400).send("Invalid request parameters");

    const car = await carController.createCar(request);
    if (!car) return res.status(400).send("Car creation error");
    response.status(200).json({
      name: car.name,
      origin: car.origin,
      year: car.year,
      mpg: car.mpg,
      cylinders: car.cylinders,
      displacement: car.displacement,
      horsepower: car.horsepower,
      weight: car.weight,
      acceleration: car.acceleration,
    });
  }
);

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: "Get a list of Cars"
 *     description: "This endpoint will return a list of all Cars"
 *     tags:
 *       - Car
 *     consumes:
 *     - "application/json"
 *     produces:
 *     - "application/json"
 *     responses:
 *       200:
 *         description: "Car list returned"
 *       400:
 *         description: "Invalid request parameters"
 *       403:
 *         description: "Invalid JWT Token"
 *       500:
 *         description: "Failed to get list of Cars"
 *       404:
 *         description: "Invalid endpoint"
 */
router.get(
  "/cars",
  validation.requestAuthentication,
  async (request, response) => {
    const cars = await carController.listCars(request);
    if (!cars) return response.status(400).send("Car listing error");
    response.status(200).json(cars);
  }
);

/**
 * @swagger
 * /api/car/:name:
 *   get:
 *     summary: "Get details of individual Car"
 *     description: "Individual Car details can be viewed using this endpoint."
 *     tags:
 *       - Car
 *     consumes:
 *     - "application/json"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "carId"
 *       required: true
 *     responses:
 *       200:
 *         description: "Car details returned successfully"
 *       400:
 *         description: "Invalid request parameters"
 *       403:
 *         description: "Invalid JWT Token"
 *       404:
 *         description: "Car Not Found"
 *       500:
 *         description: "Failed to get car details"
 */
router.get(
  "/car/:name",
  validation.requestAuthentication,
  async (request, response, next) => {
    const cars = await carController.getCarDetails(request);
    if (!cars) return response.status(400).send("Car details error");
    response.status(200).json(cars);
  }
);

/**
 * @swagger
 * /api/car/:carId:
 *   delete:
 *     summary: "Delete the Car"
 *     description: "Cars can be deleted from the db using this endpoint."
 *     tags:
 *       - Car
 *     consumes:
 *     - "application/json"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "carId"
 *       required: true
 *     responses:
 *       200:
 *         description: "Car deleted"
 *       400:
 *         description: "Invalid request parameters"
 *       403:
 *         description: "Invalid JWT Token"
 *       404:
 *         description: "Car not Found"
 *       500:
 *         description: "Failed to delete Car"
 */
router.delete(
  "/car/:carId",
  validation.requestAuthentication,
  async (request, response, next) => {
    const car = await carController.deleteCar(request);
    if (!car) return response.status(400).send("Car details error");
    response.status(200).json(car);
  }
);

module.exports = router;
