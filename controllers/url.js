const {nanoid} = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
     

    if(!body.url) return res.status(400).json({error: "Url is required"});

    const shortId = nanoid(8);
    await URL.create({
        shortId,
        redirectUrl: body.url,
        visitedHistory: [],
        createdBy: req.userId,
    });

    const allUrls = await URL.find({ createdBy: req.userId });
    return res.render("home",{id: shortId,urls: allUrls},);
    // return res.status(200).json({id : shortId});
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortId;
    const urlEntry = await URL.findOne({shortId});

    if(!urlEntry) return res.status(404).json({error: "Short URL not found"});

    return res.status(200).json({totalClicks: urlEntry.visitHistory.length, visitHistory: urlEntry.visitHistory});
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics
};
