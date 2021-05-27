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
module.exports.getAllTripsByFilter = (fromCountry, fromCity, toCountry, toCity) =>{
    let query = {};
    if(fromCountry || fromCity){
        query.destinationFrom = {}
    }
    if(toCountry || toCity){
        query.destinationTo = {}
    }
    if(fromCountry){
        query.destinationFrom.country = fromCountry
    }
    if(fromCity){
        query.destinationFrom.city = fromCity
    }
    if(toCountry){
        query.destinationTo.country = toCountry
    }
    if(toCity){
        query.destinationTo.city = toCity
    }
    return Trip.find(query);
}
module.exports.getAllTripsByCreatorId = (id) =>{
    return Trip.find({"creator.id": id});
}
module.exports.deleteTripById = (id) =>{
    return Trip.deleteOne({_id: id});
}
module.exports.updateTrip = (trip) =>{
    return Trip.replaceOne({_id: trip._id}, trip);
}
module.exports.addTraveler = async (tripId, travelerId) =>{
    const trip = await this.getTripById(tripId);
    if(trip && trip.travelers.findIndex(obj => obj.userId === travelerId) <= -1){
        trip.travelers.push({
            userId: travelerId,
            isConfirmed: false
        });
        return this.updateTrip(trip);
    }
    return null
}
module.exports.removeTraveler = async (tripId, travelerId) =>{
    const trip = await this.getTripById(tripId);
    if(trip){
        const index = trip.travelers.findIndex(obj => obj.userId === travelerId);
        if(index > -1){
            trip.travelers.splice(index, 1);
            return this.updateTrip(trip);
        }
    }
    return null
}
module.exports.confirmTraveler = async (tripId, travelerId) =>{
    const trip = await this.getTripById(tripId);
    if(trip){
        const index = trip.travelers.findIndex(obj => obj.userId === travelerId);
        trip.travelers[index].isConfirmed = true;
        return this.updateTrip(trip);
    }
    return null
}