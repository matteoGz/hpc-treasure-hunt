// init required in local enviroment
//require('dotenv').config();
// end required
const mongoose = require('mongoose');
const logger = require('./logger');
const grid = require('gridfs-stream');

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        logger.error('Error: MONGO_URI environment variable is not set');
        process.exit(1);
    }
    await mongoose.connect(process.env.MONGO_URI)
                  .then(() => {
                    logger.info('Connected to MongoDB');
                    let gfs = grid(mongoose.connection.db, mongoose.mongo);
                    gfs.collection('media');
                    logger.info('GridFS connection established');
                  })
                  .catch(err => logger.error('Error connecting to MongoDB:', err));
};

module.exports = connectDB;