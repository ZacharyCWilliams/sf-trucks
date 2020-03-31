const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const users = require("./routes/users.routes.js");

const mongoURL = "mongodb+srv://zach-meta-nutrition:password7@cluster0-igc2w.mongodb.net/test?retryWrites=true&w=majority";
mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(function(reason) {
    console.log(reason);
  });

mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", users);

app.use(passport.initialize());
require('./config/passport')(passport);

app.get("/api", (req, res) => {
  res.send("Home route, please make valid request");
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
