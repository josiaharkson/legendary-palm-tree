// Import enviromental variables
const { serverRuntimeConfig } = require("next/config").default();

const keys = {
  JWT_SECRET: serverRuntimeConfig.JWT_SECRET,
  MONGO_URI: serverRuntimeConfig.MONGO_URI,
  EMAIL_HOST: serverRuntimeConfig.EMAIL_HOST,
  EMAIL_PORT: serverRuntimeConfig.EMAIL_PORT,
  EMAIL_USER: serverRuntimeConfig.EMAIL_USER,
  EMAIL_PASSWORD: serverRuntimeConfig.EMAIL_PASSWORD,
};

module.exports = keys;
