const PackageLogin = require('../models/Packagelogin');

// Controller to get all users
// Controller to add a new user
const addUser = async (req, res) => {
    const user = new PackageLogin({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getAllUsers = async (req, res) => {
    try {
        const users = await PackageLogin.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    addUser
};
