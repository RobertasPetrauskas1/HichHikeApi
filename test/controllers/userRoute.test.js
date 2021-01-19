const chai = require('chai')
const {assert} = chai;
const chaiHttp = require('chai-http');
const app = require('../../app');

chai.use(chaiHttp);
const requester = chai.request(app).keepOpen();

const userObj = {
    "name": "Test User",
    "email": "testuser@testuser.com",
    "password": "testpassword",
    "phoneNumber": "+37060000000",
    "country": "TestCountry",
    "city": "TestCity",
    "address": "Test g. 22",
    "postalCode": "00000"
}
const userEditObj = {
    "name": "Test User2",
    "email": "testuser2@testuser.com",
    "password": "testpassword",
    "phoneNumber": "+37060000000",
    "country": "TestCountry2",
    "city": "TestCity2",
    "address": "Test2 g. 22",
    "postalCode": "00000"
}

const credentialsObj = {
    "email": "testuser@testuser.com",
    "password": "testpassword"
}
let authToken;

describe('userRoute', () =>{
    before((done) =>{
        requester.post('/api/auth/register').send(userObj).end((err, res) => {
            assert.equal(res.status, 200, 'test user created');
            requester.post('/api/auth/login').send(credentialsObj).end((err, res) =>{
                assert.equal(res.status, 200, 'test user logged in');
                authToken = res.text;
                done();
            })
        })
    })
    after((done) =>{
        requester.delete('/api/user/current').set('auth-token', authToken).end((err, res) =>{
            assert.equal(res.status, 200, 'test user deleted');
            done();
        })
    })
    it('GET /current without jwt token should return 400', () =>{
        requester.get('/api/user/current').end((err, res) =>{
            assert.equal(res.status, 400);
            assert.equal(res.text, 'Missing auth-token header');
        })
    })
    it('GET /current with bad jwt token should return 401', () =>{
        requester.get('/api/user/current').set('auth-token', "badToken").end((err, res) =>{
            assert.equal(res.status, 401);
            assert.equal(res.text, 'Access Denied');
        })
    })
    it('GET /current with good jwt token should return 200', () =>{
        requester.get('/api/user/current').set('auth-token', authToken).end((err, res) =>{
            assert.equal(res.status, 200);
        })
    })

    it('PUT /current without jwt token should return 400', () =>{
        requester.put('/api/user/current').send(userEditObj).end((err, res) =>{
            assert.equal(res.status, 400);
            assert.equal(res.text, 'Missing auth-token header');
        })
    })
    it('PUT /current with bad jwt token should return 401', () =>{
        requester.put('/api/user/current').set('auth-token', "badToken").send(userEditObj).end((err, res) =>{
            assert.equal(res.status, 401);
            assert.equal(res.text, 'Access Denied');
        })
    })
    it('PUT /current with good jwt token should return 200', () =>{
        requester.put('/api/user/current').set('auth-token', authToken).send(userEditObj).end((err, res) =>{
            assert.equal(res.status, 200);
        })
    })
})
