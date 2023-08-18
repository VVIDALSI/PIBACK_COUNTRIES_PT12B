const { Router } = require("express");
const {
  crateActivity,
  getActivities,
  getAllCountriesActivities,
  getActivitiesByCountryId,
} = require("../controllers/activityControllers");

const router = Router();

router
  .post("/", crateActivity)
  .get("/", getActivities)
  .get("/countries-activities", getAllCountriesActivities)
  .get("/countries-activities/:countryId", getActivitiesByCountryId);

module.exports = router;
