const express = require('express');
const router = express.Router();
const URL = require("../models/url");
const { restrictTo } = require("../middlewares/auth");

// These are the static routers that we used on directly on the browser like /login, /signup, /admin/urls etc.
// admin route to view all urls
router.get("/admin/urls",restrictTo(["ADMIN"]),async(req,res) => {

        // .find({}) give the all urls in the database
        const allUrls = await URL.find({});
        return res.render("home", {id : null,urls : allUrls});
})

// general admin route
router.get("/" , async (req,res) => {
    // if user is logged in then show the urls created by the user else show empty array
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