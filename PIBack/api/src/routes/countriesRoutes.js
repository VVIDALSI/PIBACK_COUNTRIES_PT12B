const { Router } = require("express");
const {
  getAllCountries,
  getCountryById,
  getCountryByName,
} = require("../controllers/countryControllers");

const router = Router();

router
  .get("/", getAllCountries)
  .get("/id/:id", getCountryById)
  .get("/name", getCountryByName);

module.exports = router;
