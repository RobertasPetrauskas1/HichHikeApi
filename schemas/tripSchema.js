const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    creatorId:{
        type: String,
        required: true
    },
    availableSeatCount:{
        type: Number,
        required: true,
        min: 1
    },
    destinationFrom:{
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
        }
    },
    destinationTo:{
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
        }
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
}, {versionKey: false});

module.exports = tripSchema;