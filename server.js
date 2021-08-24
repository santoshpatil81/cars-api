var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
var createError = require("http-errors");
var path = require("path");

var swaggerJSDoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");

var config = require("./config");
var db = require("./db/db");

// Enable bodyparser to parse incoming request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Swagger setup
var serverUrl = "http://localhost:" + config.SERVER_PORT;
var swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "Retrieve information related to the fleet of cars",
    contact: {
      name: "Santosh Patil",
    },
  },
  servers: [
    {
      url: serverUrl,
      description: "Local",
    },
  ],
};

var options = {
  swaggerDefinition,
  apis: ["./routes/cars.js", "./routes/users.js"],
};

const swaggerSpec = swaggerJSDoc(options);

// Setup routes for APIs and Swagger
const carRoutes = require("./routes/cars");
const userRoutes = require("./routes/users");

app.use("/api", carRoutes);
app.use("/api/user", userRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((request, response, next) => {
  const error = new Error("Invalid URL");
  error.status = 404;
  next(error);
});

app.use((error, request, response, next) => {
  response.status(error.status || 500);
  response.json({
    error: {
      message: error.message,
    },
  });
});

// Connect to mongodb
db.connectMongodb().then(() => {
  app.listen(config.SERVER_PORT);
});

module.exports = app;
