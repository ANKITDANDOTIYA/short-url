const express = require('express');
const {connectToDB} = require("./connect");
const URL = require("./models/url");
const path = require("path");
const cookieParser = require("cookie-parser");
const {restrictTo,checkAuth} = require("./middlewares/auth");


const staticRouter = require("./routes/staticRouter");
const urlRouter = require("./routes/url");
const userRouter = require("./routes/user");

const app = express();
const port = 8001;

connectToDB("mongodb://localhost:27017/short-url").then(() => {
    console.log("Connected to DB");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(checkAuth);



app.use("/", staticRouter);
app.use("/url",restrictTo(["NORMAL"]),urlRouter);
app.use("/user",checkAuth,userRouter);

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const urlEntry = await URL.findOneAndUpdate({ shortId },
        { $push: { visitHistory: { timeStamp: Date.now() } } },
        { new: true }
    );
    res.redirect(urlEntry.redirectUrl);
});

 

app.listen(port, () => console.log(`Server is running on port ${port}`));