const express = require("express");
const app = express();
require("dotenv").config();
require("./config/database").connect();
app.use(express.json());

//add cors
const cors = require("cors");
app.use(cors());

const homeRoutes = require("./routes/home");
const commentRoutes = require("./routes/comments");
app.use("/api/v1", homeRoutes);
app.use("/api/v1", commentRoutes);

module.exports = app;
