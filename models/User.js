const userSchema = require('../schemas/userSchema');
const model = require('mongoose').model;
const User = model('Users', userSchema);


module.exports.addNewUser = (user) =>{
    return User.create(user);
}
module.exports.getUserById = (id) =>{
    return User.findById(id);
}
module.exports.getUserByEmail = (email) =>{
    return User.findOne({email});
}
module.exports.getAllUsers = () =>{
    return User.find();
}
module.exports.deleteUserById = (id) =>{
    return User.deleteOne({_id: id});
}
module.exports.updateUser = (user) =>{
    return User.replaceOne({_id: user._id}, user);
}
