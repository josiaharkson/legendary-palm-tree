require("dotenv").config();

module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URI: process.env.MONGO_URI,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
  },

  webpack: config => {
    config.node = {
      fs: "empty",
    };
    return config;
  },
};
