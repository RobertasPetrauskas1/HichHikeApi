const { boolean } = require("@hapi/joi");
const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    creator:{
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: false,
      }
    },
    availableSeatCount: {
      type: Number,
      required: true,
      min: 1,
    },
    destinationFrom: {
      country: {
        id: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: false,
        },
      },
      city: {
        id: {
          type: String,
          required: true,
        },
        countryId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: false,
        },
      },
      address: {
        type: String,
        required: true,
      },
    },
    destinationTo: {
      country: {
        id: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: false,
        },
      },
      city: {
        id: {
          type: String,
          required: true,
        },
        countryId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: false,
        },
      },
      address: {
        type: String,
        required: true,
      },
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    travelers: [
      {
        userId: {
          type: String,
          required: true,
        },
        isConfirmed: {
          type: Boolean,
          required: true,
        },
      },
    ],
  },
  { versionKey: false }
);

module.exports = tripSchema;
