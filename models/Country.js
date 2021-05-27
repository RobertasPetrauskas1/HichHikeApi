const countrySchema = require('../schemas/countrySchema');
const model = require('mongoose').model;
const Country = model('Countries', countrySchema);

module.exports.getAllCountries = () =>{
    return Country.find();
}
module.exports.getCountryById = (id) =>{
    return Country.findById(id);
}
