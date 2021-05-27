const citySchema = require('../schemas/citySchema');
const model = require('mongoose').model;
const City = model('Cities', citySchema);

module.exports.getCityById = (id) =>{
    return City.findById(id);
}
module.exports.getCitiesByCountryId = (countryId) =>{
    return City.find({countryId});
}
