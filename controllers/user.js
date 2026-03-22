const User = require("../models/user");
const {v4 : uuidv4} = require("uuid");
const {setUser} = require("../service/auth");
const { set } = require("mongoose");

async function handleUserSignup(req, res) {
    try {
        console.log('Signup body:', req.body);
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).render("signup", { error: "All fields are required" });
        }

        await User.create({ name, email, password });
        return res.redirect("/");
    } catch (err) {
        console.error(err);
        return res.status(500).render("signup", { error: err.message || "Server error" });
    }
}

async function handleUserLogin(req, res) {
    try {
        
        const { email, password } = req.body;

         if (!email || !password) {
            return res.status(400).render("login", { error: "All fields are required" });
        }
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).render("login", { error: "Invalid email or password" });
        }

        const token = setUser(user);
        
        res.cookie("sessionId", token );
        return res.redirect("/");
    } catch (err) {
        console.error(err);
        return res.status(500).render("login", { error: err.message || "Server error" });
    }
}


module.exports = { handleUserSignup, handleUserLogin };