const assert = require('chai').assert;
const {User, Trip} = require('../../models');
const sinon = require('sinon');
const {UserService, TripService} = require('../../services');
const userService = new UserService(User);
const tripService = new TripService(userService, Trip);

const createTripObj = {
    "availableSeatCount": 2,
    "destinationFrom": {
        "country": "Lietuva",
        "city": "Kaunas",
        "address": "Savanoriu pr. 104"
    },
    "destinationTo": {
        "country": "Lietuva",
        "city": "Vilnius",
        "address": "Kauno g. 12"
    },
    "date": "2021-01-21",
    "time": "09:00-10:00",
    "description": "Test trip"
}

const getTripObj = {
    "destinationFrom": {
        "country": "Lietuva",
        "city": "Kaunas",
        "address": "Savanoriu pr. 104"
    },
    "destinationTo": {
        "country": "Lietuva",
        "city": "Vilnius",
        "address": "Kauno g. 12"
    },
    "_id": "6007120823bc1c2020d2e44a",
    "availableSeatCount": 2,
    "date": "2021-01-21T00:00:00.000Z",
    "time": "09:00-10:00",
    "description": "Vaziuojam prie juros, metames and kuro po 5 eurus uz vieta",
    "creatorId": "5ffc6bbc2c2d762d0c7a62d7"
}
const putTripObj = {
    "destinationFrom": {
        "country": "Lietuva",
        "city": "Kaunas",
        "address": "Savanoriu pr. 104"
    },
    "destinationTo": {
        "country": "Lietuva",
        "city": "Vilnius",
        "address": "Kauno g. 12"
    },
    "_id": "6007120823bc1c2020d2e44a",
    "availableSeatCount": 2,
    "date": "2021-01-21T00:00:00.000Z",
    "time": "09:00-10:00",
    "description": "Vaziuojam prie juros, metames and kuro po 10 euru uz vieta",
}

afterEach(() =>{
    sinon.restore();
})

describe('tripService:', () =>{
    it('get(id): with good id', async () =>{
        const getByIdStub = sinon.stub(Trip, 'getTripById').withArgs(getTripObj._id).returns(getTripObj);

        const response = await tripService.get(getTripObj._id);
        assert.isTrue(response.success);
        assert.deepEqual(response.result, getTripObj);
    })

    it('get(id): with non-existing id', async () =>{
        const getByIdStub = sinon.stub(Trip, 'getTripById').withArgs(getTripObj._id).returns(null);

        const response = await tripService.get(getTripObj._id);
        assert.deepEqual(response, {success: false, err: `No trip with id: ${getTripObj._id}`});
    })
    
    it('create(trip): ', async () =>{
        const createTripStub = sinon.stub(Trip, 'addNewTrip').withArgs(createTripObj).returns({ok: 1});

        const response = await tripService.create(createTripObj);
        assert.deepEqual(response, {success: true, result: "Success"});
    })

    it('edit(trip): with good data', async () =>{
        const getByIdStub = sinon.stub(Trip, 'getTripById').withArgs("6007120823bc1c2020d2e44a").returns(getTripObj);
        const updateTripStub = sinon.stub(Trip, 'updateTrip').withArgs(putTripObj).returns({ok: 1});

        const response = await tripService.edit("6007120823bc1c2020d2e44a", putTripObj);
        assert.deepEqual(response, {success: true, result: "Updated successfuly"});
    })

    it('edit(trip): with bad id', async () =>{
        const getByIdStub = sinon.stub(Trip, 'getTripById').withArgs("6007120823bc1c2020d2e44a").returns(null);
        const updateTripStub = sinon.stub(Trip, 'updateTrip').withArgs(putTripObj).returns({ok: 1});

        const response = await tripService.edit("6007120823bc1c2020d2e44a", putTripObj);
        assert.deepEqual(response, {success: false, err: `No trip with _id: ${"6007120823bc1c2020d2e44a"} found`});
    })

    it('delete(id): with good id', async () =>{
        const getByIdStub = sinon.stub(Trip, 'getTripById').withArgs(getTripObj._id).returns(getTripObj);
        const updateTripStub = sinon.stub(Trip, 'deleteTripById').withArgs(getTripObj._id).returns({ok: 1});

        const response = await tripService.delete(getTripObj._id);
        assert.deepEqual(response, {success: true, result: "Deleted successfuly"});
    })

    it('delete(id): with bad id', async () =>{
        const getByIdStub = sinon.stub(Trip, 'getTripById').withArgs(getTripObj._id).returns(null);
        const updateTripStub = sinon.stub(Trip, 'deleteTripById').withArgs(getTripObj._id).returns({ok: 1});

        const response = await tripService.delete(getTripObj._id);
        assert.deepEqual(response, {success: false, err: `No trip with _id: ${getTripObj._id} found`});
    })
})