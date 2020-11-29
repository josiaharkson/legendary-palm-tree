const express = require("express");
const next = require("next");
const chalk = require("chalk");
const mongoose = require("mongoose");

const port = parseInt(process.env.PORT, 10) || 5000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const config = require("./config");

// Import enviromental variables
const { MONGO_URI } = require("./env.js");

nextApp.prepare().then(() => {
  // Connect Database
  mongoose.connect(
    MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    () => console.log(chalk.yellow(`MongoDB Database Connected!`))
  );

  let app = express();
  app = config(app);

  // Lets next js handle any other route e.g client-side
  app.all("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(port, err => {
    if (err) throw err;

    console.log(chalk.green(`Ready on http://localhost:${port}`));
  });
});
