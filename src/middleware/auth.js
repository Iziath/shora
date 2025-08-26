const {verifyAccessToken} = require('../utils/jwt');

const authenticate = (req, res, next) =>{
    const authHeader = req.header.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        console.log('Authorization header manquant ou mal formé');
        return res.status(401).json({message: 'No token provided'});
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyAccessToken(token);
    if(!payload){
        console.log('Token d\'accès invalide');
        return res.status(401).json({message: 'Invalid or expired token'});
    }

    req.user = payload;
    next();
}

module.exports = {authenticate};
