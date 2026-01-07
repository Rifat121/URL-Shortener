const express = require("express");
const Url = require("../models/Url");
const auth = require("../middleware/auth.middleware");
const generateUniqueShortCode = require("../utils/generateShortCodes");

const router = express.Router();

// POST /api/url
router.post("/", auth, async (req, res) => {
  try {
    let { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ message: "Original URL is required" });
    }

    if (
      !originalUrl.startsWith("http://") &&
      !originalUrl.startsWith("https://")
    ) {
      originalUrl = "https://" + originalUrl;
    }

    const urlCount = await Url.countDocuments({ userId: req.userId });
    if (urlCount >= 100) {
      return res.status(403).json({
        message: "Free tier limit reached. Please upgrade.",
      });
    }

    const shortCode = await generateUniqueShortCode();

    const url = await Url.create({
      originalUrl,
      shortCode,
      userId: req.userId,
    });

    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

    res.status(201).json({
      message: "Short URL created successfully",
      data: {
        id: url._id,
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        shortUrl,
        clicks: url.clicks,
        createdAt: url.createdAt,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/url
router.get("/", auth, async (req, res) => {
  try {
    const urls = await Url.find({ userId: req.userId }).sort({ createdAt: -1 });

    const formatted = urls.map((url) => ({
      id: url._id,
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
      clicks: url.clicks,
      createdAt: url.createdAt,
    }));

    res.json({ data: formatted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/url/:id
router.delete("/:id", auth, async (req, res) => {
  try {
    const url = await Url.findOne({ _id: req.params.id, userId: req.userId });
    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    await url.deleteOne();
    res.json({ message: "URL deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
