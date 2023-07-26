const { Country, Activity } = require("../db");

const crateActivity = async (req, res) => {
  try {
    const { tour, difficult, duration, season, countries } = req.body;

    const activityFound = await Activity.findOne({ where: { name: tour } });

    if (activityFound) {
      return res
        .status(500)
        .json({ message: "la actividad que desea crear ya existe"});
    }

    let activityCreated = await Activity.create({
      name: tour,
      difficult: difficult,
      duration: duration,
      season: season,
      countries: countries,
    });

    const countriesActivity = await Country.findAll({
      where: { name: activityCreated.countries },
    });

    // await Activity.setCountries(countriesActivity);
    await activityCreated.setCountries(countriesActivity);

    return res
      .status(200)
      .json({ message: "actividad creada con exito" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getActivities = async (req, res) => {
  try {
    const findAllActivities = await Activity.findAll();
    return res.status(200).json({findAllActivities})
  } catch (error) {
    res.status(500).json({message: error.message})    
  }
};

module.exports = {
  crateActivity,
  getActivities,
};
