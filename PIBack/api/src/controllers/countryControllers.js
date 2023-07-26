const axios = require("axios");//ok
const { Country, Activity, Op } = require("../db");//ok

const getAllCountries = async (req, res) => {

  try {
    let foundCountries = await Country.findAll();

    if (foundCountries && foundCountries.length > 0) {
      console.log("Los países ya están cargados");
      return res
        .status(200)
        .json(foundCountries);
    } else {
      const response = await axios.get("https://restcountries.com/v3/all");

      const countriesApi = response.data;

      for (let countryData of countriesApi) {
        // const capital = countryData.capital?.[0] || "Desconocido";

        const country = {
          id: countryData.cca3,
          name: countryData.name.common,
          continent: countryData.region,
          capital: countryData.capital?.[0] || "unknown",
          subregion: countryData.subregion,
          lat: countryData.latlng[0],
          long: countryData.latlng[1],
          area: countryData.area,
          population: countryData.population,
          flag: countryData.flags[1],
        };
        await Country.create(country);
      }

      foundCountries = await Country.findAll();

      return res.status(201).json(foundCountries);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCountryById = async (req, res) => {
  try {
    const { id } = req.params;
    let countryFound = await Country.findByPk(id, {
      include: [{ model: Activity }],
    });

    return res.status(200).json(countryFound);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCountryByName = async (req, res) => {
  try {
    let { name } = req.query;
    let response = await Country.findOne({
      where: { name: { [Op.iLike]: "%" + name + "%" } },
    });
    if(response === null){
        return res.status(500).json({message:"country does not exist"})
    }
    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCountries,
  getCountryById,
  getCountryByName,
};
