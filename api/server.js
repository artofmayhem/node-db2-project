const express = require("express");

const server = express();
const carsRouter = require("./cars/cars-router");
server.use(express.json());
server.use("/api/cars", carsRouter);
// DO YOUR MAGIC

server.get("/", (req, res) => {
  res.status(200).json({
    message: `API STARTUP GATEWAY ACTIVE`,
  });
});
module.exports = server;
