const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Load .env environment variables into process.env
dotenv.config();

//Connect to db
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to db...");
  })
  .catch((err) => console.log("Failed to connect to db with error: " + err));

//Middlewares
app.use(express.json());

//Import routes
const {authRoute, userRoute, tripRoute} = require("./controllers");

//Route middlewares
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/trip", tripRoute);

app.get("/", (req, res) => {
  res.send("Test");
});
app.listen(process.env.PORT || 5000, () => {
  console.log("Server started...");
});
module.exports = app;
