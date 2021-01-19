const router = require("express").Router();
const User = require("../models/User");
const { userValidation, loginValidation } = require("../validations");
const authService = require('../services/authService');
const authServiceInstance = new authService(User);

router.post("/register", async (req, res) => {
  const { error } = userValidation(req.body);
  if (error) 
    return res.status(400).send(error);

  try{
    const response = await authServiceInstance.register(req.body);
    if(response.success){
      return res.send(response.result)
    }
    return res.status(400).send(response.err)
       
  } catch(err){
    return res.status(500).send(err.toString())
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) 
    return res.status(400).send(error);

    try{
      const response = await authServiceInstance.login(req.body);
      if(response.success){
        return res.send(response.result)
      }
      return res.status(400).send(response.err)
         
    } catch(err){
      return res.status(500).send(err.toString())
    }

});

module.exports = router;
