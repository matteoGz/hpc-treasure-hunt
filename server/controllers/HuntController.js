const express = require('express');
const router = express.Router();
const Hunt = require('../models/Hunt');
const logger = require('../configurations/logger');

router.post('/hunts', async (req, res) => {
  try {
    const newHunt = new Hunt(req.body);
    await newHunt.save();
    res.status(201).json(newHunt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/hunts', async (req, res) => {
  try {
    const hunts = await Hunt.find();
    res.json(hunts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/hunts/:id', async (req, res) => {
  try {
    const hunt = await Hunt.findById(req.params.id);
    if(!hunt)
        return res.status(404).json({ message: 'Hunt not found' });
    res.json(hunt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/hunts/:id', async (req, res) => {
  try {
    logger.info('Updating hunt '+ req.params.id);
    const updatedHunt = await Hunt.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!updatedHunt) 
        return res.status(404).json({ message: 'Hunt not found' });
    res.json(updatedHunt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/hunts/:id', async (req, res) => {
  try {
    await Hunt.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hunt deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/hunts/join/:joinCode', async (req, res) => {
  try {
    logger.info("Join code "+  req.params.joinCode);
    const foundHunt = await Hunt.find({ code: req.params.joinCode})
    if(!foundHunt)
      res.status(404).json({ message: 'Hunt not found' });
    logger.info("New partecipant adding..."+ req.body.userId);
    if(req.body.userId){
      const updatedHunt = await Hunt.findOneAndUpdate({ code: req.params.joinCode }, { $addToSet: { partecipants: req.body.userId } });
      res.status(201).json(updatedHunt);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;