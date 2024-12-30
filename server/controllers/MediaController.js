const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const Media = require('../models/Media');
const storage = require('../configurations/storage');

const upload = multer({ storage });

router.post('/media', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const newMedia = new Media({
      name: file.filename,
      contentType: file.mimetype,
      size: file.size,
      filename: file.originalname
    });
    await newMedia.save();
    res.status(201).json(newMedia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/media', async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/media/:id', async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if(!media)
      return res.status(404).json({ message: 'Media not found' });
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/media/:id', async (req, res) => {
  try {
    const updatedMedia = await Media.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMedia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/media/:id', async (req, res) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    if(!media)
      return res.status(404).json({ message: 'Media not found' });
    const gridFs = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
    await gridFs.delete(media.filename);
    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;