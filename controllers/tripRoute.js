const router = require("express").Router();
const {Trip, User, Country, City} = require('../models');
const {TripService, UserService, UtilService} = require('../services');
const userService = new UserService(User);
const tripService = new TripService(userService, Trip);
const utilService = new UtilService(Country, City)
const verifyJWT = require('../middleware/verifyJWT');
const {tripValidation} = require('../validations');

router.get('/', async (req, res) =>{
    let response;
    if(req.query !== {}){
        const {fromCountry, fromCity, toCountry, toCity} = req.query
        response = await tripService.getAllByFilter(fromCountry, fromCity, toCountry, toCity);
    }
    else{
        response = await tripService.getAll();
    }
    if(response.success){
        return res.send(response.result);
    }
    return res.status(400).send(response.err);
})

router.get('/current', verifyJWT, async (req, res) =>{
    const response = await tripService.getAllByCreatorId(req.user._id);
    if(response.success){
        return res.send(response.result);
    }
    return res.status(400).send(response.err);
})

router.get('/creator/:id', async (req, res) =>{
    if(!req.params.id){
        return res.status(400).send("Missing id");
    }
    const response = await tripService.getAllByCreatorId(req.params.id);
    if(response.success){
        return res.send(response.result);
    }
    return res.status(400).send(response.err);
})

router.get('/:id', async (req, res) =>{
    if(!req.params.id){
        return res.status(400).send("Missing id");
    }
    const response = await tripService.get(req.params.id);
    if(response.success){
        return res.send(response.result);
    }
    return res.status(400).send(response.err);
})

router.post('/', verifyJWT, async (req, res) =>{
    const {error} = tripValidation(req.body);
    if(error){
        return res.status(400).send(error);
    }
    const creator = await userService.get(req.user._id)
    const fromCountry = await utilService.getCountry(req.body.destinationFrom.country.id)
    const toCountry = await utilService.getCountry(req.body.destinationTo.country.id)
    const fromCity = await utilService.getCity(req.body.destinationFrom.city.id)
    const toCity = await utilService.getCity(req.body.destinationTo.city.id)

    req.body.creator = {
        id: req.user._id,
        name: creator.result.name
    }
    req.body.destinationFrom.country.name = fromCountry.result.name
    req.body.destinationTo.country.name = toCountry.result.name

    req.body.destinationFrom.city.name = fromCity.result.name
    req.body.destinationFrom.city.countryId = fromCity.result.countryId
    req.body.destinationTo.city.name = toCity.result.name
    req.body.destinationTo.city.countryId = toCity.result.countryId

    const response = await tripService.create(req.body);
    if(response.success){
        return res.send(response.result);
    }
    return res.status(400).send(response.err);
})

router.put('/:id', verifyJWT, async (req, res) =>{
    if(!req.params.id){
        return res.status(400).send("Missing id");
    }
    const {error} = tripValidation(req.body);
    if(error){
        return res.status(400).send(error);
    }

    const exists = await tripService.get(req.params.id);
    if(exists.success){
        if(req.user._id === exists.result.creator.id || req.user.role === process.env.ADMIN_ROLE){
            req.body.creator.id = exists.result.creator.id;
            const response = await tripService.edit(req.params.id, req.body);
            if(response.success){
                return res.send(response.result);
            }
            return res.status(400).send(response.err);
        }else{
            return res.status(401).send("Unauthorized");
        }
    }else{
        return res.status(400).send(exists.err);
    }
})
router.delete('/:id', verifyJWT, async (req, res) =>{
    if(!req.params.id){
        return res.status(400).send("Missing id");
    }
    const exists = await tripService.get(req.params.id);

    if(exists.success){
        if(req.user._id === exists.result.creator.id || req.user.role === process.env.ADMIN_ROLE){
            const response = await tripService.delete(req.params.id);
            if(response.success){
                return res.send(response.result);
            }
            return res.status(400).send(response.err);
        } else{
            return res.status(401).send("Unauthorized");
        }
    }
    return res.status(400).send(exists.err);
})
router.post('/:id/participate', verifyJWT, async (req, res) =>{
    const response = await tripService.addTraveler(req.params.id, req.user._id);
    if(response.success){
        return res.send("Success");
    }
    return res.status(400).send(response.err);
})

router.post('/:id/unparticipate', verifyJWT, async (req, res) =>{
    const response = await tripService.removeTraveler(req.params.id, req.user._id);
    if(response.success){
        return res.send("Success");
    }
    return res.status(400).send(response.err);
})

router.post('/:tripId/confirm/:travelerId', verifyJWT, async (req, res) =>{
    const tripResult = await tripService.get(req.params.tripId);
    if(!tripResult.success){
        return res.status(400).send(tripResult.err)
    }
    const trip = tripResult.result

    if(req.user._id !== trip.creator.id){
        return res.status(401).send("Unauthorized");
    }

    const response = await tripService.confirmTraveler(req.params.tripId, req.params.travelerId);
    if(response.success){
        return res.send("Success");
    }
    return res.status(400).send(response.err);
})

router.post('/:tripId/remove/:travelerId', verifyJWT, async (req, res) =>{
    const tripResult = await tripService.get(req.params.tripId);
    if(!tripResult.success){
        return res.status(400).send(tripResult.err)
    }
    const trip = tripResult.result
    if(req.user._id !== trip.creator.id){
        return res.status(401).send("Unauthorized");
    }

    const response = await tripService.removeTraveler(req.params.tripId, req.params.travelerId);
    if(response.success){
        return res.send("Success");
    }
    return res.status(400).send(response.err);
})

module.exports = router;
