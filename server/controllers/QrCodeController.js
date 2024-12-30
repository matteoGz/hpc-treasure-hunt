const express = require('express');
const router = express.Router();
const QRCode = require('../models/QrCode');
const { createQRCodeWithNewMedia, deleteQRCodeAndMedia } = require('../services/QrCodeMediaService');

router.post('/qrcodes', async (req, res) => {
    try {
        const { qrData, mediaData } = req.body;
        const newQRCode = await createQRCodeWithNewMedia(qrData, mediaData);
        res.status(201).json(newQRCode);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/qrcodes/:id', async (req, res) => {
    try {
        const qrCodeId = req.params.id;
        const qrCode = await QRCode.findById(qrCodeId);
        if(!qrCode)
            return res.status(404).json({ message: 'QR code not found' });
        const mediaId = qrCode.image;
        await deleteQRCodeAndMedia(qrCodeId, mediaId);
        res.json({ message: 'QR code deleted successfully' });
    } catch (error) {
        await session.abortTransaction();
        console.error(error);
        res.status(500).json({ error: error.message });
    } finally {
      session.endSession();
    }
});
   
module.exports = router;