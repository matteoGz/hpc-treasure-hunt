const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// logger & db configuration
const logger = require('./configurations/logger');
const connectDB = require('./configurations/database');
connectDB();

// webserver configuration
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const cors = require('cors'); 
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    methods: 'GET, POST, PUT, PATCH, DELETE', // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
})); 

const prefix = "/api";
// routes that does not require auth token 
const authController = require('./controllers/AuthController');
app.use(prefix + '/auth', authController);

// routes that require authentication
const { authenticateToken } = require('./utils/util');
app.use(authenticateToken);
const userController = require('./controllers/UserController');
app.use(prefix, userController);
const huntController = require('./controllers/HuntController');
app.use(prefix, huntController);
const hintController = require('./controllers/HintController');
app.use(prefix, hintController);
const qrCodeController = require('./controllers/QrCodeController');
app.use(prefix, qrCodeController);
const mediaController = require('./controllers/MediaController');
app.use(prefix, mediaController);

app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});