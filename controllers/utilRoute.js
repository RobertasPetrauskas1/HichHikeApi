const router = require("express").Router();
const Country = require("../models/Country")
const City = require("../models/City")
const UtilServiceClass = require("../services/utilService")
const utilService = new UtilServiceClass(Country, City)

router.get('/country', async (req, res) => {
    const response = await utilService.getCountry();
        if(response.success){
            return res.send(response.result)
        }
        else{
            return res.status(400).send(response.err);
        }
})

router.get('/country/:id', async (req, res) => {
    if(!req.params.id){
        return res.status(400).send("Missing id")
    }
    const response = await utilService.getCountry(req.params.id);
        if(response.success){
            return res.send(response.result)
        }
        else{
            return res.status(400).send(response.err);
        }
})

router.get('/city/:id', async (req, res) => {
    if(!req.params.id){
        return res.status(400).send("Missing id")
    }
    const response = await utilService.getCity(req.params.id);
        if(response.success){
            return res.send(response.result)
        }
        else{
            return res.status(400).send(response.err);
        }
})

router.get('/city/country/:id', async (req, res) => {
    if(!req.params.id){
        return res.status(400).send("Missing id")
    }
    const response = await utilService.getCityByCountryId(req.params.id);
        if(response.success){
            return res.send(response.result)
        }
        else{
            return res.status(400).send(response.err);
        }
})

module.exports = router;
