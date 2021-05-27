module.exports = class UtilServiceClass{
    constructor(countryModel, cityModel){
        this.countryModel = countryModel;
        this.cityModel = cityModel;
    }
    async getCountry(id){       
        try{
            var result
            if(id){
                result = await this.countryModel.getCountryById(id);
                if(result){
                    return {success: true, result}
                }
                return {success: false, err: `No country with id: ${id}`}

            }else{
                result = await this.countryModel.getAllCountries()
                if(result){
                    return {success: true, result}
                }
                return {success: false, err: `Internal error`}
            }            
        }catch(err){
            return {success: false, err: err.toString()}
        }
    }

    async getCity(id){       
        try{
            var result
            if(id){
                result = await this.cityModel.getCityById(id);
                if(result){
                    return {success: true, result}
                }
                return {success: false, err: `No city with id: ${id}`}

            }else{
                result = await this.cityModel.getAllCities()
                if(result){
                    return {success: true, result}
                }
                return {success: false, err: `Internal error`}
            }            
        }catch(err){
            return {success: false, err: err.toString()}
        }
    }
    
    async getCityByCountryId(id){       
        try{
            var result
            if(id){
                result = await this.cityModel.getCitiesByCountryId(id);
                if(result){
                    return {success: true, result}
                }
                return {success: false, err: `No cities with country id: ${id}`}

            }else{
                return {success: false, err: `Missing country id`}
            }            
        }catch(err){
            return {success: false, err: err.toString()}
        }
    }
}

