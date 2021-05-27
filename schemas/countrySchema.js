const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema(
  {
    name:{
        type: String,
        required: true
    }
  },
  { versionKey: false }
);

module.exports = countrySchema;
