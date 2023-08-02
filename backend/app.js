// import express module
const express = require("express");
// import bcrypt module
const bcrypt = require("bcrypt");
// import multer module
const multer = require("multer");
// import path module
const path = require("path");
// import axios module
const axios = require("axios");
// import body-parser module
const bodyParser = require("body-parser");
// import mongoose module
const mongoose = require("mongoose");
// mongodb://127.0.0.1:27017 => @ de base du serveur MongoDB (PORT 27017)
// marsDB => DB name
mongoose.connect("mongodb://127.0.0.1:27017/marsDB");

// creates express application
const app = express();

// App Configuration
// Send JSON Response
app.use(bodyParser.json());
// Get Object from Request
app.use(bodyParser.urlencoded({ extended: true }));

// Security configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});

app.use("/myFiles", express.static(path.join("backend/images")));
// Media Types
const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storageConfig = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    let error = new Error("Mime type is invalid");
    if (isValid) {
      error = null;
    }
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + "-" + Date.now() + "." + extension;
    cb(null, imgName);
  },
});

// Models Importation
const Match = require("./models/match");
const User = require("./models/user");

function generateId(T) {
  let max;
  if (T.length == 0) {
    max = 0;
  } else {
    max = T[0].id;
    for (let i = 1; i < T.length; i++) {
      if (T[i].id > max) {
        max = T[i].id;
      }
    }
  }
  return max;
}

// DB Simulation
let matchesTab = [
  {
    id: 1,
    teamOne: "Real Madrid",
    teamTwo: "barcelona ",
    scoreOne: "4",
    scoreTwo: "0",
  },
  {
    id: 2,
    teamOne: "inter",
    teamTwo: "manchester city ",
    scoreOne: "7",
    scoreTwo: "1",
  },
  {
    id: 3,
    teamOne: "ROM",
    teamTwo: "manchester united ",
    scoreOne: "2",
    scoreTwo: "3",
  },
  { id: 4, teamOne: "CA", teamTwo: "EST ", scoreOne: "1", scoreTwo: "1" },
];

// Business Logic: Get All Matches
app.get("/matches", (req, res) => {
  // Traitement
  console.log("here into BL: Get ALL matches");
  Match.find().then((docs) => {
    res.json({ matches: docs });
  });
});
// Business Logic: Get  Match By ID (:id => id is a param)
app.get("/matches/:id", (req, res) => {
  // Traitement
  console.log("Here into BL: Get Match By ID");
  let id = req.params.id;
  Match.findOne({ _id: id }).then((doc) => {
    res.json({ match: doc });
  });
});
// Business Logic: Delete  Match By ID
app.delete("/matches/:id", (req, res) => {
  // Traitement
  console.log("Here into BL: Delete Match By ID");
  let id = req.params.id;
  Match.deleteOne({ _id: id }).then((response) => {
    console.log("Here response after delete", response);
    if (response.deletedCount == 1) {
      res.json({ message: "Deleted with success" });
    } else {
      res.json({ message: "Error" });
    }
  });
});
// Business Logic: Add Match
app.post("/matches", (req, res) => {
  // Traitement
  console.log("Here into BL: Add Match");
  let matchObj = new Match(req.body);
  matchObj.save();
  res.json({ msg: "Added with success" });
});
// Business Logic: Edit Match
app.put("/matches", (req, res) => {
  // Traitement
  console.log("Here into BL: Edit Match");
  let match = req.body;
  Match.updateOne({ _id: req.body._id }, match).then((response) => {
    console.log("Here response after update", response);
    if (response.nModified == 1) {
      res.json({ message: "Updated with Success" });
    } else {
      res.json({ message: "error" });
    }
  });
});

// Business Logic: Search Matches By ScoreOne Or ScoreTwo
app.post("/searchMatches", (req, res) => {
  console.log("Here into search Matches", req.body);
  let match = req.body;
  let findedMatches = matchesTab.filter((elt) => {
    return elt.scoreOne == match.scoreOne || elt.scoreTwo == match.scoreTwo;
  });
  res.json({ msg: "DONE", tab: findedMatches });
});

app.get("/api/matches/search/:s1/:s2", (req, res) => {
  console.log("Here into search");
  let x = req.params.s1;
  let y = req.params.s2;
  Match.find({ scoreOne: x, scoreTwo: y }).then((docs) => {
    console.log("Here finded matches ", docs);
    res.json({ findedMatches: docs });
  });
});

app.post("/api/matches/search", (req, res) => {
  console.log("Here into search", req.body);
  let obj = req.body;
  Match.find({ scoreOne: obj.s1, scoreTwo: obj.s2 }).then((docs) => {
    console.log("Here finded matches ", docs);
    res.json({ findedMatches: docs });
  });
});

// Business Logic: Signup
app.post(
  "/users/signup",
  multer({ storage: storageConfig }).single("img"),
  (req, res) => {
    console.log("Here into BL: Signup", req.body);
    bcrypt.hash(req.body.password, 8).then((cryptedPwd) => {
      req.body.password = cryptedPwd;
      req.body.avatar = "http://localhost:3000/myFiles/" + req.file.filename;
      let user = new User(req.body);
      user.save((error, doc) => {
        if (error) {
          res.json({ msg: false });
        } else {
          res.json({ msg: true });
        }
      });
    });
  }
);

// Business Logic: Login
// 0 => Email Error
// 1 => Pwd Error
// 2 => Success
app.post("/users/login", (req, res) => {
  console.log("Here into BL: Login", req.body);
  let user;
  User.findOne({ email: req.body.email })
    .then((doc) => {
      user = doc;
      console.log("Here doc", doc);
      if (!doc) {
        res.json({ msg: "0" });
      } else {
        return bcrypt.compare(req.body.pwd, doc.password);
      }
    })
    .then((checkPwd) => {
      console.log("Here checkpwd", checkPwd);
      if (!checkPwd) {
        res.json({ msg: "1" });
      } else {
        let userToSend = {
          id: user._id,
          fName: user.firstName,
          lName: user.lastName,
          role: user.role,
        };
        res.json({ msg: "2", connectedUser: userToSend });
      }
    });
});

// Business Logic: Search Weather
app.post("/api/weather", (req, res) => {
  console.log("Here city", req.body);
  let key = "62ee756a34835483299877a61961cafb";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=${key}`;
  axios.get(apiURL).then((response) => {
    let data = response.data;
    console.log("Here response from axios", data);

    let result = {
      temperature: data.main.temp,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      icon: data.weather[0].icon,
    };

    res.json({ result: result});
  });
});
// make app exportable
module.exports = app;
