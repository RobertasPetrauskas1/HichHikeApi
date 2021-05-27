module.exports = class TripService{
    constructor(userService, tripModel){
        this.userService = userService;
        this.tripModel = tripModel;
    }

    async get(id){
        try{
            const result = await this.tripModel.getTripById(id);
            if(result){
                return {success: true, result}
            }

            return {success: false, err: `No trip with id: ${id}`}
        }catch(err){
            return {success: false, err: `id: ${id} is invalid`}
        }
    }
    async getAll(){
        try{
            const result = await this.tripModel.getAllTrips();
            return {success: true, result}
        }catch(err){
            return {success: false, err: err.toString()}
        }
    }
    async getAllByFilter(fromCountry, fromCity, toCountry, toCity){
        try{
            const result = await this.tripModel.getAllTripsByFilter(fromCountry, fromCity, toCountry, toCity);
            return {success: true, result}
        }catch(err){
            return {success: false, err: err.toString()}
        }
    }
    async getAllByCreatorId(id){
        try{
            const result = await this.tripModel.getAllTripsByCreatorId(id);
            return {success: true, result}
        }catch(err){
            return {success: false, err: err.toString()}
        }
    }
    async create(trip){
        try {
            const result = await this.tripModel.addNewTrip(trip);
            return {success: true, result: "Success"}
        } catch (err) {
            return {success: false, err: err.toString()}
        }
    }
    async edit(id, trip){
        const exists = await this.tripModel.getTripById(id);
        if(!exists){
            return {success: false, err: `No trip with _id: ${id} found`}
        }
        
        try {
            const result = await this.tripModel.updateTrip(trip);
            if(result.ok === 1){
                return {success: true, result: "Updated successfuly"}
            }

            return {success: false, err: "Failed to update trip with id: " + id}
        } catch (err) {
            return {success: false, err: err.toString()}
        }
    }
    async delete(id){
        const exists = await this.tripModel.getTripById(id);
        if(!exists){
            return {success: false, err: `No trip with _id: ${id} found`}
        }

        try {            
            const result = await this.tripModel.deleteTripById(id);
            if(result.ok === 1){
                return {success: true, result: "Deleted successfuly"}
            }

            return {success: false, err: "Failed to delete trip with id: " + id}
        } catch (err) {
            return {success: false, err: err.toString()}
        }
    }
    async addTraveler(tripId, travelerId){
        try{
            const result = await this.tripModel.addTraveler(tripId, travelerId);
            if(result)
                return {success: true, result}
            
                return {success: false, err: "Failed to add traveler"}
        }catch(err){
            return {success: false, err: err.toString()}
        }
    }
    async removeTraveler(tripId, travelerId){
        try{
            const result = await this.tripModel.removeTraveler(tripId, travelerId);
            if(result)
                return {success: true, result}
            
                return {success: false, err: "Failed to remove traveler"}
        }catch(err){
            return {success: false, err: err.toString()}
        }
    }
    async confirmTraveler(tripId, travelerId){
        try{
            const result = await this.tripModel.confirmTraveler(tripId, travelerId);
            if(result)
                return {success: true, result}
            
                return {success: false, err: "Failed to confirm traveler"}
        }catch(err){
            return {success: false, err: err.toString()}
        }
    }
}