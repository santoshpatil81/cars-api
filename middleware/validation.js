const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

/**
 * Validate input fields for /api/user/register api
 * @param {Object} request - The request object
 * @return {Object} request - The request object on successful validation
 */
const userRegisterRequestValidation = (request) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(config.EMAIL_MIN_LENGHT)
      .max(config.EMAIL_MAX_LENGHT)
      .required()
      .email(),
    password: Joi.string()
      .min(config.PWD_MIN_LENGHT)
      .max(config.PWD_MAX_LENGHT)
      .required(),
    username: Joi.string()
      .min(config.NAME_MIN_LENGHT)
      .max(config.NAME_MAX_LENGHT)
      .required(),
  });
  console.log(schema.validate(request));
  return schema.validate(request);
};

/**
 * Validate input fields for /api/user/login api
 * @param {Object} request - The request object
 * @return {Object} request - The request object on successful validation
 */
const userLoginRequestValidation = (request) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(config.EMAIL_MIN_LENGHT)
      .max(config.EMAIL_MAX_LENGHT)
      .required()
      .email(),
    password: Joi.string()
      .min(config.PWD_MIN_LENGHT)
      .max(config.PWD_MAX_LENGHT)
      .required(),
  });

  return schema.validate(request);
};

/**
 * Validate input fields for /api/car/create api
 * @param {Object} request - The request object
 * @return {Object} request - The request object on successful validation
 */
const carInputDataValidation = (request) => {
  console.log(request);
  const schema = Joi.object({
    name: Joi.string()
      .min(config.NAME_MIN_LENGHT)
      .max(config.NAME_MAX_LENGHT)
      .required(),
    origin: Joi.string()
      .min(config.ORIGIN_MIN_LENGHT)
      .max(config.ORIGIN_MAX_LENGHT)
      .required(),
    year: Joi.date().required(),
    mpg: Joi.number().required(),
    weight: Joi.number().required(),
    cylinders: Joi.number().required(),
    displacement: Joi.number().required(),
    horsepower: Joi.number().required(),
    displacement: Joi.number().required(),
    acceleration: Joi.number().required(),
  });

  console.log(schema.validate(request));

  return schema.validate(request);
};

/**
 * Generate a new JWT Token on successful login
 * @param {Object} request - The request object
 * @param {Object} user    - The user object
 * @param {String} secret  - The JWT Token secret
 * @return {Sting} jwtToken- The JWT Token
 */
const generateJWTToken = async (request, user, secret) => {
  const passwdCompare = await bcrypt.compare(
    request.body.password,
    user.password
  );

  if (!passwdCompare) {
    return null;
  }

  //Create and assign a token
  const jwtToken = jwt.sign({ _id: user._id }, secret);

  return jwtToken;
};

/**
 * Authenticate the request
 * @param {Object} request - The request object
 * @param {Object} response - The response object
 * @return {Object} response - The response includes status and  message
 */
const requestAuthentication = async (request, response, next) => {
  try {
    const jwtToken = request.headers.authorization.split(" ")[1];
    request.userData = jwt.verify(jwtToken, config.TOKEN_SECRET);
    next();
  } catch (error) {
    return response.status(403).json({ message: "Invalid JWT Token." });
  }
};

module.exports.carInputDataValidation = carInputDataValidation;
module.exports.requestAuthentication = requestAuthentication;
module.exports.userLoginRequestValidation = userLoginRequestValidation;
module.exports.userRegisterRequestValidation = userRegisterRequestValidation;
module.exports.generateJWTToken = generateJWTToken;
