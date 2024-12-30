const mongoose = require('mongoose');
const Media = require('../models/Media');
const QrCode = require('../models/QrCode');

// Transactional insert into media & qrcode collections
async function createQRCodeWithNewMedia(qrData, mediaData) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const newMedia = new Media({ ...mediaData, status: 'processing' });
        await newMedia.save({ session });

        const newQRCode = new QRCode({ ...qrData, image: newMedia._id });
        await newQRCode.save({ session });

        await Media.findByIdAndUpdate(newMedia._id, { status: 'completed' }, { session });
        await session.commitTransaction();
        return newQRCode;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

// Transactional media & qrcode delete
async function deleteQRCodeAndMedia(qrCodeId, mediaId) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        await QrCode.findByIdAndDelete(qrCodeId, { session });
        await Media.findByIdAndDelete(mediaId, { session });
        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

module.exports = { createQRCodeWithNewMedia, deleteQRCodeAndMedia };