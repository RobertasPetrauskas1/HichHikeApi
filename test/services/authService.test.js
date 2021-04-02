const assert = require('chai').assert;
const User = require('../../models/User');
const sinon = require('sinon');
const AuthService = require('../../services/authService');
const authService = new AuthService(User);

const newUserObj = {
    "name": "Test User",
    "email": "test@gmail.com",
    "password": "password",
    "phoneNumber": "+37065376764",
    "country": "Lietuva",
    "city": "Kaunas",
    "address": "Ukmergės g. 22",
    "postalCode": "49315"
}

const loginUserObj = {
    "name": "Test User",
    "email": "test@gmail.com",
    "password": "$2a$10$W/LYWmGSorAfkEchDhLhHuHhiOwIISDRBxaHn3cnwJCWwJ8lxlBn6",
    "phoneNumber": "+37065376764",
    "country": "Lietuva",
    "city": "Kaunas",
    "address": "Ukmergės g. 22",
    "postalCode": "49315"
}

const goodCredentialsObj = {
    "email": "test@gmail.com",
    "password": "password"   
}
const badEmailCredentialsObj = {
    "email": "badEmail@gmail.com",
    "password": "password"   
}
const badPasswordCredentialsObj = {
    "email": "test1@gmail.com",
    "password": "badPassword"   
}

afterEach(() => {
    sinon.restore();
})

describe('AuthService:', () =>{
    describe('register(user):', () =>{
        it('successful call', async () =>{
            const getByEmailStub = sinon.stub(User, 'getUserByEmail').withArgs(newUserObj.email).returns(null);
            const addNewUserStub = sinon.stub(User, 'addNewUser').returns({ok: 1});

            const result = await authService.register(newUserObj);
            assert.deepEqual(result, {success: true, result: "Success"});
        })

        it('email already exists', async () =>{
            const getByEmailStub = sinon.stub(User, 'getUserByEmail').withArgs(newUserObj.email).returns(newUserObj);

            const result = await authService.register(newUserObj);
            assert.deepEqual(result, {success: false, err: "Email already exists"});
        })
    })
    describe('login(credentials):', () =>{
        it('successful call', async () =>{
            const getByEmailStub = sinon.stub(User, 'getUserByEmail').withArgs(goodCredentialsObj.email).returns(loginUserObj);
            
            const result = await authService.login(goodCredentialsObj);
            assert.isTrue(result.success, JSON.stringify(result))
        })
        it('bad email call', async () =>{
            const getByEmailStub = sinon.stub(User, 'getUserByEmail').withArgs(badEmailCredentialsObj.email).returns(null);
            
            const result = await authService.login(badEmailCredentialsObj);
            assert.deepEqual(result, {success: false, err: "Username and/or password incorrect"})
        })
        it('bad password call', async () =>{
            const getByEmailStub = sinon.stub(User, 'getUserByEmail').withArgs(badPasswordCredentialsObj.email).returns(null);
            
            const result = await authService.login(badEmailCredentialsObj);
            assert.deepEqual(result, {success: false, err: "Username and/or password incorrect"})
        })
    })
})