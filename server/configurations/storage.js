const { GridFsStorage } = require('multer-gridfs-storage');

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = `${Date.now()}-${file.filename}`;
      const fileInfo = {
        filename: filename,
        bucketName: 'media'
      };
      resolve(fileInfo);
    });
  }
});

module.exports = storage;