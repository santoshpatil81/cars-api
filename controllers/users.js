const User = require("../models/Users");

/**
 * Check if user exists
 * @param {String} email - The email ID
 * @return {Object} user - The response includes status and message
 */
const checkUserExists = async (email) => {
  const user = await User.findOne({ email: email });
  if (user) return user;
  return null;
};

/**
 * Create a new user during register operation
 * @param {Object} request - The request object
 * @param {String} passwordHash  - The JWT password hash
 * @return {Object} user- The user object, null if not created
 */
const createUser = async (request, passwordHash) => {
  const user = await new User({
    username: request.body.username,
    email: request.body.email,
    password: passwordHash,
  }).save();

  return user;
};

/**
 * Delete a user
 * @param {String} email  - The email of the user
 * @return {Object} user- The user object, null if not found
 */
const deleteUser = async (email) => {
  const user = await User.deleteOne({ email: email });
  return user;
};

module.exports.checkUserExists = checkUserExists;
module.exports.createUser = createUser;
module.exports.deleteUser = deleteUser;
