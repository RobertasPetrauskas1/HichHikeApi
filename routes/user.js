const router = require("express").Router();
const User = require("../models/User");
const verifyJWT = require('../middleware/verifyJWT')

router.get('/', verifyJWT, (req, res) => {
    if(req.user.role === process.env.ADMIN_ROLE){
        User.find().then(users => res.send(users));
    }
    else{
        res.status(401).send("Access Denied");
    }
})

router.get('/current', verifyJWT, (req, res) => {
    findUserById(req.user._id).then(user => res.send(user));
})

router.get('/:id', verifyJWT, (req, res) => {
    if(req.user.role === process.env.ADMIN_ROLE){
        findUserById(req.params.id).then(user => res.send(user));
    }
    else{
        res.status(401).send("Access Denied");
    }
})

router.put('/current', verifyJWT, (req, res) => {
    updateUser(req.body).then((response) => {
        if(response === false){
            return res.status(404).send("User not found");
        }else if(response === 0){
            return res.status(400).send("No changes made");
        }else{
            return res.send("Updated succesfuly")
        }
    })
})

router.put('/', verifyJWT, (req, res) => {
    if(req.user.role === process.env.ADMIN_ROLE){
        updateUser(req.body).then((response) => {
            if(response === false){
                return res.status(404).send("User not found");
            }else if(response === 0){
                return res.status(400).send("No changes made");
            }else{
                return res.send("Updated succesfuly")
            }
        })
    }
    else{
        res.status(401).send("Access Denied");
    }
})

router.delete('/current', verifyJWT, async (req, res) =>{
    const id = req.user._id;
    if(!id)
        return res.status(400).send("Invalid id")

    const found = await User.findById(id);
    if(!found)
        return res.status(400).send("No user with id: " + id)

    User.deleteOne({_id: id}).then(response => {
        if(response.ok === 1){
            return res.send("Deleted succesfuly")
        }
        else{
            return res.status(400).send("Failed to delete user with id: " + id)
        }
    })
});

router.delete('/:id', verifyJWT, async (req, res) =>{
    const id = req.params.id;
    if(req.user.role === process.env.ADMIN_ROLE){
        if(!id)
        return res.status(400).send("Invalid id")

        const found = await User.findById(id);
        if(!found)
            return res.status(400).send("No user with id: " + id)

        User.deleteOne({_id: id}).then(response => {
            if(response.ok === 1){
                return res.send("Deleted succesfuly")
        }
        else{
            return res.status(400).send("Failed to delete user with id: " + id)
        }
    })
    }
    else{
        res.status(401).send("Access Denied");
    }
});

const findUserById = async (id) =>{
    return await User.findById(id);
}

const updateUser = async (user) =>{
    const found = await User.findById(user._id);
    if(!found)
        return false;

    return await User.replaceOne({_id: user._id}, user).nModified;
}

module.exports = router;
