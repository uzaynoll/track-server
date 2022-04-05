require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const requireAuth = require("./middleware/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri =
  "mongodb+srv://uzaynoll:test123@cluster0.dyrj3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(mongoUri);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB instance successfully");
});

mongoose.connection.on("error", (err) => {
  console.error("Error occured", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your Email ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
