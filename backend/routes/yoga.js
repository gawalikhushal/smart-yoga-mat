const router = require("express").Router();
const Performance = require("../models/Performance");

router.post("/save", async (req, res) => {
  const data = new Performance(req.body);
  await data.save();
  res.send({ success: true });
});

router.get("/history/:user", async (req, res) => {
  const data = await Performance.find({ user: req.params.user });
  res.send(data);
});

module.exports = router;
