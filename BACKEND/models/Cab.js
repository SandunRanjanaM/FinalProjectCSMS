const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cabSchema = new Schema({
    packageName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    timePeriod: {
        type: String,
        required: true
    },
    role: {
        
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    userCount: {
        type: Number,
        default: 0
    },
    content: {
        type: [String], 
        required: true
    },

    approved: {
        type: Boolean,
        default: false,
       
    },


});

const Cab = mongoose.model("Cab", cabSchema);

module.exports = Cab;
