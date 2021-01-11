const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email:{
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password:{
        type: String,
        required: true,
        min: 8
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    postalCode:{
        type: String,
        required: true,
        length: 5
    },
    role:{
        type: String,
        required: true
    }
}, {versionKey: false});

module.exports = userSchema;