const mongoose = require('mongoose');

const PackageLoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const PackageLogin = mongoose.model('PackageLogin', PackageLoginSchema);

module.exports = PackageLogin;