// DO YOUR MAGIC
const router = require("express").Router();
const Cars = require("./cars-model");

const {
  checkVinNumberUnique,
  checkCarPayload,
  checkCarId,
  checkVinNumberValid,
} = require("./cars-middleware");


//Get all cars
router.get("/", async (req, res, next) => {
  try {
    const carData = await Cars.getAll();
    res.status(200).json(carData);
  } catch (err) {
    next(err);
  }
});

//Get Car By ID
router.get("/:id", checkCarId, (req, res) => {
  res.status(200).json(req.car);
});

//Post new Car
router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res, next) => {
    try {
      const payload = {
        vin: req.body.vin,
        make: req.body.make,
        model: req.body.model,
        mileage: req.body.mileage,
        title: req.body.title || "Not Known",
        transmission: req.body.transmission || "Not Known",
      };

      const newCar = await Cars.create(payload);
      res.status(201).json(newCar);
    } catch (err) {
      next(err);
    }
  }
);

//Put to update a car by id
router.put(
  "/:id",
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  async (req, res, next) => {
    const { id } = req.body.id;
    const foundCar = req.body;

    try {
      const payload = {
        vin: foundCar.vin,
        make: foundCar.make,
        model: foundCar.model,
        mileage: foundCar.mileage,
        title: foundCar.title || "Not Known",
        transmission: foundCar.transmission || "Not Known",
      };

      await Cars.update(req.params.id, payload);
      const updatedCar = await Cars.getById(id);

      res.status(200).json(updatedCar);
    } catch (err) {
      next(err);
    }
  }
);

//86 a car from the list by id
router.delete("/:id", checkCarId, async (req, res, next) => {
  const { id } = req.params.id;

  try {
    const deletedCarRecord = await Cars.getById(id);
    await Cars.remove(id);
    res.status(200).json({
      message: "Car has been moved from inventory",
      deletedCar: deletedCarRecord,
    });
  } catch (err) {
    next(err);
  }
});

//Error Catch
router.use((err, req, res, next) => {// eslint-disable-line

  console.log(err);
  res.status(500).json({
    message: "Something went wrong with the request", err
  });
});

module.exports = router;
