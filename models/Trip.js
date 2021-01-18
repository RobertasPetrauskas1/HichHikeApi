const tripSchema = require('../schemas/tripSchema');
const model = require('mongoose').model;
const Trip = model('Trips', tripSchema);

module.exports.addNewTrip = (trip) =>{
    return Trip.create(trip);
}
module.exports.getTripById = (id) =>{
    return Trip.findById(id);
}
module.exports.getAllTrips = () =>{
    return Trip.find();
}
module.exports.deleteTripById = (id) =>{
    return Trip.deleteOne({_id: id});
}
module.exports.updateTrip = (trip) =>{
    return Trip.replaceOne({_id: trip._id}, trip);
}