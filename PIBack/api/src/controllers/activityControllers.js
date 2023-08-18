const { Country, Activity, countryActivity } = require("../db");

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

const getAllCountriesActivities = async (req, res) => {
  try {
    // Obtener todas las actividades con sus países asociados
    const allCountriesActivities = await Activity.findAll({
      include: [Country], // Incluir los países asociados
    });

    return res.status(200).json({ allCountriesActivities });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getActivitiesByCountryId = async (req, res) => {
  try {
    const { countryId } = req.params;

    // Buscar todas las relaciones de la tabla intermedia que tengan el ID del país dado
    const activitiesByCountry = await countryActivity.findAll({
      where: { CountryId: countryId },
    });

    // Extraer solo los IDs de las actividades relacionadas
    const activityIds = activitiesByCountry.map((relation) => relation.ActivityId);

    // Buscar las actividades asociadas usando los IDs extraídos
    // Aquí estamos asumiendo que el modelo de actividad se llama "Activity"
    const relatedActivities = await Activity.findAll({
      where: { id: activityIds },
    });

    return res.status(200).json({ relatedActivities });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  crateActivity,
  getActivities,
  getAllCountriesActivities,
  getActivitiesByCountryId,
};
