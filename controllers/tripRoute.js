const router = require("express").Router();
const {Trip, User} = require('../models');
const {TripService, UserService} = require('../services');
const userService = new UserService(User);
const tripService = new TripService(userService, Trip);
const verifyJWT = require('../middleware/verifyJWT');
const {createTripValidation, editTripValidation} = require('../validations');

router.get('/', async (req, res) =>{
    const response = await tripService.getAll();
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
    const {error} = createTripValidation(req.body);
    if(error){
        return res.status(400).send(error);
    }

    req.body.creatorId = req.user._id;
    const response = await tripService.create(req.body);
    if(response.success){
        return res.send(response.result);
    }
    return res.status(400).send(response.err);
})

router.put('/', verifyJWT, async (req, res) =>{
    const {error} = editTripValidation(req.body);
    if(error){
        return res.status(400).send(error);
    }

    const exists = await tripService.get(req.body._id);
    if(exists.success){
        if(req.user._id === exists.result.creatorId || req.user.role === process.env.ADMIN_ROLE){
            req.body.creatorId = exists.result.creatorId;
            const response = await tripService.edit(req.body);
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
        if(req.user._id === exists.result.creatorId || req.user.role === process.env.ADMIN_ROLE){
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

module.exports = router;
