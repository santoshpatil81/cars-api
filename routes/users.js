const router = require("express").Router();
const bcrypt = require("bcryptjs");
const config = require("../config");
const validation = require("../middleware/validation");
const userController = require("../controllers/users");

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: "Creates a new user"
 *     description: "This endpoint will create a new user"
 *     tags:
 *       - User
 *     consumes:
 *     - "application/json"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "name"
 *       required: false
 *     - name: "email"
 *       in: "description"
 *       required: true
 *     - name: "password"
 *       in: "description"
 *       required: true
 *     responses:
 *       200:
 *         description: "User created"
 *       400:
 *         description: "Invalid request parameters"
 *       403:
 *         description: "Invalid JWT Token"
 *       500:
 *         description: "Failed to create user"
 *       404:
 *         description: "Invalid endpoint"
 */
router.post("/register", async (request, response) => {
  try {
    // Validate request body
    const { error } = validation.userRegisterRequestValidation(request.body);
    if (error) return response.status(400).send("Invalid request parameters");

    // Check if user already exists
    const userExists = await userController.checkUserExists(request.body.email);
    if (userExists) {
      return response.status(400).send("User exists");
    }

    // Generate password hash
    const salt = await bcrypt.genSalt(config.PASSWORD_SALT);
    const passwordHash = await bcrypt.hash(request.body.password, salt);

    // Create user
    const user = await userController.createUser(request, passwordHash);
    if (!user) return response.status(401).send("User creation failed");

    response.status(200).json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    response.status(500).send("Failed to create user " + error);
  }
});

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: "Validates user and generated a JWT token"
 *     description: "This endpoint will validate a user and return a JWT token"
 *     tags:
 *       - User
 *     consumes:
 *     - "application/json"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "email"
 *       in: "description"
 *       required: true
 *     - name: "password"
 *       in: "description"
 *       required: true
 *     responses:
 *       200:
 *         description: "OK"
 *       400:
 *         description: "Invalid request parameters or User not found or Invalid password"
 *       403:
 *         description: "Invalid JWT Token"
 *       500:
 *         description: "Login failed"
 *       404:
 *         description: "Invalid endpoint"
 */
router.post("/login", async (request, response, next) => {
  try {
    // Validate request body
    const { error } = validation.userLoginRequestValidation(request.body);
    if (error) return response.status(400).send("Invalid request parameters");

    // Verify user email exists
    const user = await userController.checkUserExists(request.body.email);
    if (!user) {
      return response.status(400).send("User not found");
    }

    // Generate JWT Token and return
    const jwtToken = await validation.generateJWTToken(
      request,
      user,
      config.TOKEN_SECRET
    );
    if (!jwtToken) {
      return response.status(400).send("Invalid password");
    }

    response.header("auth-token", jwtToken).status(200).json({
      idToken: jwtToken,
      expiresIn: config.JWT_TOKEN_EXPIRY,
    });
  } catch (error) {
    response.status(500).send("login failed " + error);
  }
});

/**
 * @swagger
 * /api/user/:email:
 *   delete:
 *     summary: "Deletes user"
 *     description: "This endpoint will delete a user"
 *     tags:
 *       - User
 *     consumes:
 *     - "application/json"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "email"
 *       in: "description"
 *       required: true
 *     responses:
 *       200:
 *         description: "OK"
 *       400:
 *         description: "Invalid request parameters or User not found or Invalid password"
 *       403:
 *         description: "Invalid JWT Token"
 *       500:
 *         description: "Delete failed"
 */
router.delete("/:email", async (request, response, next) => {
  const user = await userController.deleteUser(request.params.email);
  if (!user) return response.status(200).send("User detele error");
  response.status(200).json(user);
});

module.exports = router;
