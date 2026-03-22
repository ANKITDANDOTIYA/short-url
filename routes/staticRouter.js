const express = require('express');
const router = express.Router();
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");



router.get("/admin/urls",restrictTo(["ADMIN"]),async(req,res) => {

        const allUrls = await URL.find({});
        return res.render("home", {id : null,urls : allUrls});
})

router.get("/" , async (req,res) => {
     const allUrls = req.user ?  await URL.find({createdBy: req.user.id}) : [];
    return res.render("home", {id : null,urls : allUrls});
})

router.get("/signup", (req,res) => {
    return res.render("signup");
});

router.get("/login", (req,res) => {
    return res.render("login");
});

module.exports = router;