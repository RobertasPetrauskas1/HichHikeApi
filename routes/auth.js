const router = require("express").Router();
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validations");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error);

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  req.body.role = process.env.USER_ROLE;

  const user = new User(req.body);
  user
    .save()
    .then((userResponse) => {
      res.send(userResponse);
    })
    .catch((err) => {
      res.status(401).send("Error: " + err);
    });
});

router.post("/login", (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) 
    return res.status(400).send(error);

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({_id: user._id, email: user.email, role: user.role}, process.env.TOKEN_SECRET, { expiresIn: '720h' });
        return res.header('auth-token', token).send(token);
      }
      return res.status(400).send("Username and/or password incorrect");
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

module.exports = router;
