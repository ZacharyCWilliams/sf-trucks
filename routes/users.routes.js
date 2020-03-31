const User = require("../models/user.model.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validate = require("../models/user.model.js");
const express = require("express");
const _ = require("lodash");
const router = express.Router();
const passport = require("passport");

// login
router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).send({ validation: false, message: "Username invalid" });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).send({ validation: false, message: "Password invalid" });
  res.status(200).send({ validation: true });
});

// register
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User already registered");

  user = new User(_.pick(req.body, ["username", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.status(200).send(_.pick(user, ["_id", "username"]));
});

//get users

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});  

module.exports = router;
