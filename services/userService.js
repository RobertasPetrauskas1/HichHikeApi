const {hashPassword} = require('./authService')
module.exports = class UserService{
    constructor(userModel){
        this.userModel = userModel;
    }
    async get(id){       
        try{
            const result = await this.userModel.getUserById(id);
            if(result){
                this.deleteSensitiveFields(result)
                return {success: true, result}
            }
            
            return {success: false, err: `No user with id: ${id}`}
        }catch(err){
            return {success: false, err: `id: ${id} is invalid`}
        }
    }
    async getAll(){
        try{
            const result = await this.userModel.getAllUsers();
            result.forEach(element => {
                this.deleteSensitiveFields(element)
            });
            return {success: true, result}
        }catch(err){
            return {success: false, err: err.toString()}
        }
    }
    async update(id, user){
        const found = await this.userModel.getUserById(id);
        if(!found){
            return {success: false, err: `User with id: ${id} not found`}
        }

        try{
            user._id = id;
            user.password = await hashPassword(user.password)
            const result = await this.userModel.updateUser(user);
            if(result.ok === 1){
                return {success: true, result: "Updated successfuly"}
            }

            return {success: false, err: "Failed to update user with id: " + id}
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

    deleteSensitiveFields(obj){
        delete obj._doc.password
    }
}

