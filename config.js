module.exports = {
  // MongoDB Connection String
  MONGO_URI: process.env.MONGO_URI || "mongodb://mongo-db:27017/Cars",

  // SERVER PORT
  SERVER_PORT: process.env.SERVER_PORT || 3200,

  // JWT Token Secret
  TOKEN_SECRET:
    process.env.TOKEN_SECRET ||
    "pvpnCCZfwOF85pBjbOebZiYIDhZ3w9LZrKwBZ7152K89mPCOHtbRlmr5Z91ci4L",

  // Express Server Port
  LISTEN_PORT: process.env.LISTEN_PORT || 3200,

  // Password Salt
  PASSWORD_SALT: process.env.PASSWORD_SALT || 10,

  // JWT Token expiry & encryption algorithm
  JWT_TOKEN_EXPIRY: process.env.JWT_TOKEN_EXPIRY || "3600000",
  JWT_TOKEN_ALGORITHM: process.env.JWT_TOKEN_ALGORITHM || "RS256",
  JWT_TOKEN_SUBJECT: process.env.JWT_TOKEN_SUBJECT || "JWT Token",

  // Input validations
  NAME_MIN_LENGHT: process.env.NAME_MIN_LENGHT || 8,
  NAME_MAX_LENGHT: process.env.NAME_MAX_LENGHT || 255,
  ORIGIN_MIN_LENGHT: process.env.ORIGIN_MIN_LENGHT || 2,
  ORIGIN_MAX_LENGHT: process.env.ORIGIN_MAX_LENGHT || 255,
  EMAIL_MIN_LENGHT: process.env.EMAIL_MIN_LENGHT || 8,
  EMAIL_MAX_LENGHT: process.env.EMAIL_MAX_LENGHT || 255,
  PWD_MIN_LENGHT: process.env.PWD_MIN_LENGHT || 8,
  PWD_MAX_LENGHT: process.env.PWD_MAX_LENGHT || 255,

  // Unit test data
  UNITTEST_USER_EMAIL:
    process.env.UNITTEST_USER_EMAIL || "adminUnitTest@test.com",
  UNITTEST_USER_NAME: process.env.UNITTEST_USER_NAME || "adminUnitTest",
  UNITTEST_USER_PASSWORD: process.env.UNITTEST_USER_PASSWORD || "test1234",

  UNITTEST_NAME_01: process.env.UNITTEST_NAME_01 || "chevrolet chevelle malibu",
  UNITTEST_MPG_01: process.env.UNITTEST_MPG_01 || 18,
  UNITTEST_CYL_01: process.env.UNITTEST_CYL_01 || 8,
  UNITTEST_DISP_01: process.env.UNITTEST_DISP_01 || 307,
  UNITTEST_HP_01: process.env.UNITTEST_HP_01 || 130,
  UNITTEST_WT_01: process.env.UNITTEST_WT_01 || 3504,
  UNITTEST_ACC_01: process.env.UNITTEST_ACC_01 || 12,
  UNITTEST_YR_01: process.env.UNITTEST_YR_01 || "1970-01-01",
  UNITTEST_ORG_01: process.env.UNITTEST_ORG_01 || "USA",

  UNITTEST_NAME_02: process.env.UNITTEST_NAME_02 || "buick skylark 320",
  UNITTEST_MPG_02: process.env.UNITTEST_MPG_02 || 15,
  UNITTEST_CYL_02: process.env.UNITTEST_CYL_02 || 8,
  UNITTEST_DISP_02: process.env.UNITTEST_DISP_02 || 350,
  UNITTEST_HP_02: process.env.UNITTEST_HP_02 || 165,
  UNITTEST_WT_02: process.env.UNITTEST_WT_02 || 3693,
  UNITTEST_ACC_02: process.env.UNITTEST_ACC_02 || 11,
  UNITTEST_YR_02: process.env.UNITTEST_YR_02 || "1970-01-01",
  UNITTEST_ORG_02: process.env.UNITTEST_ORG_02 || "USA",

  UNITTEST_JWTTOKEN:
    process.env.UNITTEST_JWTTOKEN ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGZiYTIzMTA2OWNhMjdjNDU4ZWViZDUiLCJpYXQiOjE2MjcxMDM3OTN9.1_YpHNWFVG1-tuKlt6djsriqoS-TTByCkkVAZHLFWiw",
};
