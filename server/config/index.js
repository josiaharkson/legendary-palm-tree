const express = require("express");
const router = require("../routes");
const morgan = require("morgan");

const config = app => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: false,
    })
  );
  app.use(morgan("dev"));

  app.use("/api", router);
  return app;
};

module.exports = config;
