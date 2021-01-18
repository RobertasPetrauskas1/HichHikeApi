const {hashPassword} = require('./authService')
module.exports = class userService{
    constructor(userModel){
        this.userModel = userModel;
    }
    async get(id){       
        try{
            const result = await this.userModel.getUserById(id);
            return {success: true, result}
        }catch(err){
            return {success: false, err: err.toString()}
        }
    }
    async getAll(){
        try{
            const result = await this.userModel.getAllUsers();
            return {success: true, result}
        }catch(err){
            return {success: false, err: err.toString()}
        }
    }
    async update(user){
        const found = await this.userModel.getUserById(user._id);
        if(!found){
            return {success: false, err: `User with id: ${user._id} not found`}
        }

        try{
            user.password = await hashPassword(user.password)
            const result = await this.userModel.updateUser(user);
            if(result.ok === 1){
                return {success: true, result: "Updated successfuly"}
            }

            return {success: false, err: "Failed to update user with id: " + user._id}
        }catch(err){
            return {success: false, err: err.toString()}
        }
    }
    async delete(id){
        const found = await this.userModel.getUserById(id);
        if(!found){
            return {success: false, err: `User with id: ${id} not found`}
        }

        try{
            const result = await this.userModel.deleteUserById(id);
            if(result.ok === 1){
                return {success: true, result: "Deleted successfuly"}
            }

            return {success: false, err: "Failed to delete user with id: " + id}
        }catch(err){
            return {success: false, err: err.toString()}
        }
    }
}

