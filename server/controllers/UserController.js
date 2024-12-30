const express = require('express');
const router = express.Router();
const User = require('../models/User');
const logger = require('../configurations/logger');

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        logger.error("Error searching users "+ error.message)
        res.status(500).json({ error: error.message });
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        logger.error("Error searching user with id "+req.params.id+": "+ error.message)
        res.status(500).json({ error: error.message });
    }
});

router.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.json(updatedUser);
    } catch (error) {
        logger.error("Error updating user with id ",req.params.id,": ", error.message)
        res.status(400).json({ error: error.message });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        logger.error("Error deleting user with id ",req.params.id,": ", error.message)
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;