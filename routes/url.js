const express = require('express');
const {handleGenerateNewShortUrl,handleGetAnalytics} = require("../controllers/url");

const router = express.Router();

// /url Route 
router.post('/', handleGenerateNewShortUrl);

router.get('/:shortId/analytics', handleGetAnalytics);

module.exports = router;