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
    async create(trip){
        try {
            const result = await this.tripModel.addNewTrip(trip);
            return {success: true, result: "Success"}
        } catch (err) {
            return {success: false, err: err.toString()}
        }
    }
    async edit(trip){
        const exists = await this.tripModel.getTripById(trip._id);
        if(!exists){
            return {success: false, err: `No trip with _id: ${trip._id} found`}
        }
        
        try {
            const result = await this.tripModel.updateTrip(trip);
            if(result.ok === 1){
                return {success: true, result: "Updated successfuly"}
            }

            return {success: false, err: "Failed to update trip with id: " + trip._id}
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
}