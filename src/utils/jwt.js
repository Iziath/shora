const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAccessToken = (user) =>{
    /**
     * Fonction de génération du token d'accès
     * @param {object} user - L'utilisateur pour lequel générer le token
     * @returns {string} - Le token d'accès

     */
    return jwt.sign(
        {
            userId: user._id,
            username: user.username,
            email: user.email
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
    );
};

const generateRefreshToken = (user) =>{
    /**
     * Fonction de génération du token de rafraîchissement
     * @param {object} user - L'utilisateur pour lequel générer le token
     * @returns {string} - Le token de rafraîchissement

     */
    return jwt.sign(
        {userId: user._id,},
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    );
};

const verifyAccessToken = (token) =>{
    /**
     * Fonction de vérification du token d'accès
     * @param {string} token - Le token d'accès à vérifier
     * @returns {object|null} - Le token décodé si valide, sinon null

     */
    try{
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        console.log("Clé d'accès décodé", decoded);
        return decoded;
    }catch(err){
        return null;
    }
};

const verifyRefreshToken = (token) =>{
    /**
     * Fonction de vérification du token de rafraîchissement
     * @param {string} token - Le token de rafraîchissement à vérifier
     * @returns {object|null} - Le token décodé si valide, sinon null
     */
    try{
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        console.log("Clé de rafraîchissement décodé", decoded);
        return decoded;
    }catch(err){
        return null;
    }
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}

