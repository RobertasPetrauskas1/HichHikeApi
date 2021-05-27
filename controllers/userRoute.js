const router = require("express").Router();
const User = require("../models/User");
const verifyJWT = require('../middleware/verifyJWT');
const {userValidation} = require('../validations');
const userService = require('../services/userService');
const userServiceInstance = new userService(User);

router.get('/', verifyJWT, async (req, res) => {
    if(req.user.role === process.env.ADMIN_ROLE){
        const response = await userServiceInstance.getAll();
        if(response.success){
            return res.send(response.result)
        }
        else{
            return res.status(400).send(response.err);
        }
    }
    else{
        return res.status(401).send("Unauthorized");
    }
})

router.get('/current', verifyJWT, async (req, res) => {
    const response = await userServiceInstance.get(req.user._id);
        if(response.success){
            return res.send(response.result)
        }
        else{
            return res.status(400).send(response.err);
        }
})

router.get('/:id', async (req, res) => {
        const response = await userServiceInstance.get(req.params.id);
        if(response.success){
            return res.send(response.result)
        }
        else{
            return res.status(400).send(response.err);
        }
})

router.put('/current', verifyJWT, async (req, res) => {
    const { error } = userValidation(req.body);
    if (error) 
        return res.status(400).send(error);

    const response = await userServiceInstance.update(req.user._id, req.body);
        if(response.success){
            return res.send(response.result);
        }
        else{
            return res.status(400).send(response.err);
        }
})

router.put('/:id', verifyJWT, async (req, res) => {
    if(!req.params.id){
        return res.status(400).send("Missing id");
    }
    if(req.user.role === process.env.ADMIN_ROLE){
        const { error } = userValidation(req.body);
        if (error) 
            return res.status(400).send(error);

        const response = await userServiceInstance.update(req.params.id, req.body);
        if(response.success){
            return res.send(response.result);
        }
        else{
            return res.status(400).send(response.err);
        }
    }
    else{
        return res.status(401).send("Unauthorized");
    }
})

router.delete('/current', verifyJWT, async (req, res) =>{

    const response = await userServiceInstance.delete(req.user._id);
        if(response.success){
            return res.send(response.result);
        }
        else{
            return res.status(400).send(response.err);
        }
});

router.delete('/:id', verifyJWT, async (req, res) =>{
    if(req.user.role === process.env.ADMIN_ROLE){
        const response = await userServiceInstance.delete(req.params.id);
        if(response.success){
            return res.send(response.result);
        }
        else{
            return res.status(400).send(response.err);
        }
    }
    else{
        return res.status(401).send("Unauthorized");
    }
});

module.exports = router;
