const express = require('express');
const urlRouter = require("./routes/url");
const {connectToDB} = require("./connect");
const URL = require("./models/url");
const path = require("path");
const staticRouter = require("./routes/staticRouter");

const app = express();
const port = 8001;

connectToDB("mongodb://localhost:27017/short-url").then(() => {
    console.log("Connected to DB");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", staticRouter);
app.use("/url",urlRouter);

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const urlEntry = await URL.findOneAndUpdate({ shortId },
        { $push: { visitHistory: { timeStamp: Date.now() } } },
        { new: true }
    );
    res.redirect(urlEntry.redirectUrl);
});

app.use("/", staticRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));