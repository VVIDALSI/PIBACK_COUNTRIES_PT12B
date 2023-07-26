const { Router } = require("express");
const {
    crateActivity,
    getActivities,
} = require("../controllers/activityControllers");

const router = Router();

router
  .post("/", crateActivity)
  .get("/", getActivities);

module.exports = router;