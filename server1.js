const express = require("express");
const app = express();

app.use(express.json());

const urls = {};
let id = 1;

// Home
app.get("/", (req, res) => {
    res.send("URL Shortener Service Running!");
});

// Create Short URL
app.post("/shorten", (req, res) => {
    const { url } = req.body;

    if (!url)
        return res.status(400).json({ message: "URL is required" });

    const shortCode = id.toString(36);
    urls[shortCode] = url;
    id++;

    res.json({
        originalUrl: url,
        shortUrl: `http://localhost:3000/${shortCode}`
    });
});

// Redirect to Original URL
app.get("/:code", (req, res) => {
    const url = urls[req.params.code];

    if (!url)
        return res.status(404).json({ message: "Short URL not found" });

    res.redirect(url);
});

// Get All URLs
app.get("/urls/all", (req, res) => {
    res.json(urls);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
