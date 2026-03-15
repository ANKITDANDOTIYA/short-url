const express = require('express');
const router = express.Router();
const URL = require("../models/url");

router.get("/", async (req,res) => {
    if(!req.userId) return res.render("home",{id : null,urls : []});
    

     const allUrls = await URL.find({createdBy: req.userId});
    return res.render("home", {id : null,urls : allUrls});
})

router.get("/signup", (req,res) => {
    return res.render("signup");
});

router.get("/login", (req,res) => {
    return res.render("login");
});

module.exports = router;