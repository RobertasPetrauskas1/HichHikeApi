const assert = require('chai').assert;
const User = require('../../models/User');
const sinon = require('sinon');
const UserService = require('../../services/userService');
const userService = new UserService(User);

const userObj = {
    "_id": "5ff9ca813844e025945cf8ab",
    "name": "HitchHike-Admin",
    "email": "admin@hitchhike.com",
    "password": "password",
    "phoneNumber": "+37065376764",
    "country": "Lietuva",
    "city": "Kaunas",
    "address": "Ukmergės g. 22",
    "postalCode": "49315",
    "role": "USER"
}

const userObj2 = {
    "_id": "5ff9ca813844e025945cf8ab",
    "name": "HitchHike-Admin",
    "email": "admin@hitchhike.com",
    "password": "password2",
    "phoneNumber": "+37065376764",
    "country": "Lietuva",
    "city": "Kaunas",
    "address": "Ukmergės g. 22",
    "postalCode": "49315",
    "role": "USER"
}
afterEach(() => {
    sinon.restore();
})

describe('userService:', () =>{
    it('update(user): successful call', async () =>{
        const getByIdStub = sinon.stub(User, 'getUserById').withArgs("5ff9ca813844e025945cf8ab").returns(userObj2);
        const deleteStub = sinon.stub(User, 'updateUser').withArgs(userObj).returns({ok: 1});

        const result = await userService.update("5ff9ca813844e025945cf8ab", userObj);
        assert.deepEqual(result, {success: true, result: "Updated successfuly"})
    })
    it('update(user): with bad id', async () =>{
        const getByIdStub = sinon.stub(User, 'getUserById').withArgs("5ff9ca813844e025945cf8ab").returns(null);

        const result = await userService.update("5ff9ca813844e025945cf8ab", userObj);
        assert.deepEqual(result, {success: false, err: `User with id: ${userObj._id} not found`})
    })

    it('delete(id): successful call', async () =>{
        const getByIdStub = sinon.stub(User, 'getUserById').withArgs(userObj._id).returns(userObj);
        const deleteStub = sinon.stub(User, 'deleteUserById').withArgs(userObj._id).returns({ok: 1});

        const result = await userService.delete(userObj._id);
        assert.deepEqual(result, {success: true, result: "Deleted successfuly"})
    })
    it('delete(id): with bad id', async () =>{
        const getByIdStub = sinon.stub(User, 'getUserById').withArgs(userObj._id).returns(null);

        const result = await userService.delete(userObj._id);
        assert.deepEqual(result, {success: false, err: `User with id: ${userObj._id} not found`})
    })
})