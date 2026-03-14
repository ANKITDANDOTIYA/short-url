const express = require('express');
const urlRouter = require("./routes/url");
const {connectToDB} = require("./connect");
const URL = require("./models/url");

const app = express();
const port = 8001;

connectToDB("mongodb://localhost:27017/short-url").then(() => {
    console.log("Connected to DB");
});

app.use(express.json());

app.use("/url",urlRouter);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const urlEntry = await URL.findOneAndUpdate({ shortId },
        { $push: { visitHistory: { timeStamp: Date.now() } } },
        { new: true }
    );
    res.redirect(urlEntry.redirectUrl);
})


app.listen(port, () => console.log(`Server is running on port ${port}`));