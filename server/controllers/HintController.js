const express = require('express');
const router = express.Router();
const Hint = require('../models/Hint');

router.post('/hints', async (req, res) => {
  try {
    const newHint = new Hint(req.body);
    await newHint.save();
    res.status(201).json(newHint);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/hints', async (req, res) => {
  try {
    const hints = await Hint.find();
    res.json(hints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/hints/:id', async (req, res) => {
  try {
    const hint = await Hint.findById(req.params.id);
    if(!hint)
        return res.status(404).json({ message: 'Hint not found' });
    res.json(hint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/hintsByHuntId/:id', async (req, res) => {
  try {
    const hints = await Hint.find({ hunt: req.params.id});
    if(!hints)
        return res.status(404).json({ message: 'Hints not found' });
    res.json(hints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/hintsByHuntId/:id/:number', async (req, res) => {
  try {
    const hint = await Hint.findOne({ hunt: req.params.id, number: req.params.number });
    if(!hint)
        return res.status(404).json({ message: 'Hint not found' });
    res.json(hint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/hints/:id', async (req, res) => {
  try {
    const updatedHint = await Hint.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!updatedHint) 
        return res.status(404).json({ message: 'Hint not found' });
    res.json(updatedHint);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/hints/:id', async (req, res) => {
  try {
    await Hint.findByIdAndDelete(req.params.id);
    res.json({ message: 'Hint deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;