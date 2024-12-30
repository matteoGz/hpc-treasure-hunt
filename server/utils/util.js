const jwt = require('jsonwebtoken');

const utils = {
    authenticateToken: 
        function authenticateToken(req, res, next) {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
        
            if(token == null) 
                return res.sendStatus(401);
        
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err)
                return res.sendStatus(403);
            req.user = user;
            next();
            });
        },
    generateRandomCode:
        function generateRandomCode(){
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@?!*';
            let result = '';
            const charactersLength = characters.length;
            for (let i = 0; i < 6; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
}

module.exports = utils;