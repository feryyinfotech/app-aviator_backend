const Country = require("../../models/CST/Country");
const allCountries = require("country-state-city").Country;
const allStates = require("country-state-city").State;
const State = require("../../models/CST/Country");

const createAllCountry = () => {
  try {
    const res = allCountries.getAllCountries().forEach((i, index) => {
      console.log(i);
      Country.create({ name: i.name, id: index });
    });

    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

const createAllState = () => {
  try {
    const res = allStates.getAllStates().forEach((i, index) => {
      console.log(i);
      State.create({ name: i.name, c_id: i.countryCode });
    });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};

module.exports = createAllCountry;
module.exports = createAllState;
