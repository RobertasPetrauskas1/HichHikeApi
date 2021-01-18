const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

module.exports = class authService{
    constructor(userModel){
        this.userModel = userModel;
    }
    async register(user){
        const emailExists = await this.userModel.getUserByEmail(user.email);
        if(emailExists)
            return {success: false, err: "Email already exists"}

        user.password = await hashPassword(user.password);
        user.role = process.env.USER_ROLE; 

        try{
            const result = await this.userModel.addNewUser(user);
            if(result){
                return {success: true, result: "Success"}
            }

            return {success: false, err: "Failed to register user"}
        } catch{
            return {success: false, err: err.toString()}
        }
    }
    async login(credentials){
        try{
            const user = await this.userModel.getUserByEmail(credentials.email);
            if(user && bcrypt.compareSync(credentials.password, user.password)){
                const token = jwt.sign({_id: user._id, email: user.email, role: user.role}, process.env.TOKEN_SECRET, { expiresIn: '720h' });
                return {success: true, result: token}
            }
            return {success: false, err: "Username and/or password incorrect"}
        }catch(err){
            return {success: false, err: err.toString()}
        }
    }
}

const hashPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}
module.exports.hashPassword = hashPassword;