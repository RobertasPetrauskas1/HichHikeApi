const assert = require('chai').assert;
const User = require('../../models/User');
const sinon = require('sinon');
const UserService = require('../../services/userService');
const userService = new UserService(User);

let userObj = {
    "_id": "5ff9ca813844e025945cf8ab",
    "name": "HitchHike-Admin",
    "email": "admin@hitchhike.com",
    "password": "password",
    "phoneNumber": "+37065376764",
    "country": "Lietuva",
    "city": "Kaunas",
    "address": "Ukmergės g. 22",
    "postalCode": "49315",
    "role": "ADMIN"
}

let userObj2 = {
    "_id": "5ff9ca813844e025945cf8ab",
    "name": "HitchHike-Admin",
    "email": "admin@hitchhike.com",
    "password": "password2",
    "phoneNumber": "+37065376764",
    "country": "Lietuva",
    "city": "Kaunas",
    "address": "Ukmergės g. 22",
    "postalCode": "49315",
    "role": "ADMIN"
}
const getByIdStub = sinon.stub(User, 'getUserById').returns(userObj)
const updateStub = sinon.stub(User, 'updateUser').returns(userObj)

describe('userService', () =>{
    it('update', () =>{

    

    })
})