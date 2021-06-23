const Cars = require("../cars/cars-model.js");
let vinValidator = require("vin-validator");

const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params.id;
  Cars  
    .getById(id)
    .then((car) => {
      if (car) {
        req.car = car;
        next();
      } else {
        //  - `checkCarId` returns a status 404 with a `{ message: "car with id <car id> is not found" }` if the id in `req.params` does not exist in the database.
        res.status(404).json({
          message: `car with id ${id} is not found`,
        });
      }
    })
    .catch((error) => {
      next(error);
    });
};
//`checkCarPayload` returns a status 400 with a `{ message: "<field name> is missing" }` if any required field is missing.
const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.vin) {
    return res.status(400).json({
      message: `vin is missing`,
    });
  } else if (!req.body.make) {
    return res.status(400).json({
      message: `make is missing`,
    });
  } else if (!req.body.model) {
    return res.status(400).json({
      message: `model is missing`,
    });
  } else if (!req.body.mileage) {
    return res.status(400).json({
      message: `mileage is missing`,
    });
  }
  next();
};
// - `checkVinNumberValid` returns a status 400 with a `{ message: "vin <vin number> is invalid" }` if the vin number is [invalid](https://www.npmjs.com/package/vin-validator).
const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const validateVin = vinValidator.validate(req.body.vin);

  if (validateVin) {
    next();
  } else {
    return res.status(400).json({
      message: `vin ${req.body.vin} is invalid`,
    });
  }
};
// - `checkVinNumberUnique` returns a status 400 with a `{ message: "vin <vin number> already exists" }` if the vin number already exists in the database.
const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  Cars.getAll()
    .then((cars) => {
      if (cars.length > 0) {
        const locatedCarVin = cars.find(
          (car) => car.vin.toLowerCase() === req.body.vin.toLowerCase()
        );
        if (locatedCarVin) {
          return res.status(400).json({
            message: `vin ${req.body.vin} already exists`,
          });
        } else {
          next();
        }
      } else {
        next();
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
