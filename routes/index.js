const express = require("express");
const app = express();

const paperRoute = require("./paper.route");

app.use("/", paperRoute);

module.exports = app;