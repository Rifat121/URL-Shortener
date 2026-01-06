const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const urlRoutes = require("./routes/url.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/url", urlRoutes);

module.exports = app;
