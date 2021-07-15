const mongoose = require('mongoose');
var schema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
        unique: false
    },
    LastName: {
        type: String,
        required: true,
        unique: false
    },
    AddressLine: {
        type: String,
        required: true,
        unique: false
    },
    City: {
        type: String,
        required: true,
        unique: false
    },
    Country: {
        type: String,
        required: true,
        unique: false
    },
    Location: {
        type: { type: String },
        coordinates: []
    }

    }
    
)

schema.index({ "Location": "2dsphere" });

const UserDb = mongoose.model('UserDb', schema);

module.exports = UserDb;