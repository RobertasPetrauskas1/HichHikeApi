const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    countryId:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    }
  },
  { versionKey: false }
);

module.exports = citySchema;
