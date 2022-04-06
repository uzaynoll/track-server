const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const mongoose = require("mongoose");
const requireAuth = require("/Dev/ReactNative/Tracker/track-server/src/middleware/requireAuth");

const track = mongoose.model("Track");

const router = express.Router();

router.use(requireAuth);

router.get("/tracks", async (req, res) => {
  const tracks = await track.find({ userId: req.user._id });
  res.send(tracks);
});

router.post("/tracks", async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    return res
      .status(422)
      .send({ error: "You must provide a name and locations" });
  }

  try {
    const Track = new track({ name, locations, userId: req.user._id });
    await Track.save();
    res.send(Track);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
