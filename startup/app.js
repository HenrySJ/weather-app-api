const express = require("express");
const weather = require("../routes/weather");

// App
module.exports = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.use("/api/weather", weather);

  // Server
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};
