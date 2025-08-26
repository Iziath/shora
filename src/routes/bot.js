const express = require('express');
const router = express.Router();
const botController = require('../controller/botController');

router.post('/voice-bot', botController.voiceBot)
router.get('/audio/:filename', botController.getAudio);

module.exports = router;
