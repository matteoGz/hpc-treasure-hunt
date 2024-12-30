const express = require('express');
const router = express.Router();
const User = require('../models/User');
const logger = require('../configurations/logger');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ username });
      if (!user) return res.status(401).json({ message: 'Invalid username or password' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid username or password' });
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '60m' });
  
      res.json({ token: token, uid: user._id });
    } catch (error) {
      logger.error("Error during login: " + error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/register', async (req, res) => {
    try {
        logger.info("CREATING NEW USER...", req.body)
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        logger.error("Error creating new user "+ error.message)
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;