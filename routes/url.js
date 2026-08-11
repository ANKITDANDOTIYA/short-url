const express = require('express');
const {handleGenerateNewShortUrl,handleGetAnalytics} = require("../controllers/url");

// Use router to make easy to manage the routes and make it modular and scalable
const router = express.Router();

// /url Route 
router.post('/', handleGenerateNewShortUrl);

router.get('/:shortId/analytics', handleGetAnalytics);

module.exports = router;