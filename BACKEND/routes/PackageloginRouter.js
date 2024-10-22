const express = require('express');
const { getAllUsers,addUser } = require('../Controllers/packageloginController');

const router = express.Router();

// Route to get all users
router.get('/users', getAllUsers);

router.post('/add', addUser);

module.exports = router;
