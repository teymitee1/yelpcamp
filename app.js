const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  flash = require("connect-flash"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override"),
  Campground = require("./models/campground"),
  Comment = require("./models/comments"),
  User = require("./models/user"),
  seedDB = require("./seeds");

//requiring routes
let commentRoutes = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgrounds"),
  indexRoutes = require("./routes/index");

// mongoose.connect("mongodb+srv://teymitee:4KdHUEJmd8w21t5h@yelpcamp-amcv1.mongodb.net/YelpCamp?retryWrites=true", { useNewUrlParser: true });
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback() {
//   console.log("Connection to DB succeeded");
// });

const options = {
  useMongoClient: true,
  reconnectTries: 5000,
  reconnectInterval: 0,
  socketTimeoutMS: 100000,
  connectTimeoutMS: 100000
}

mongoose.connect("mongodb+srv://teymitee:4KdHUEJmd8w21t5h@yelpcamp-amcv1.mongodb.net/YelpCamp?retryWrites=true");
var db = mongoose.connection;

db.on('error', function (error) {
  console.log('Error while connecting to mongodb database:', error);
});

db.once('open', function () {
  console.log('Successfully connected to mongodb database');
});

db.on('disconnected', function () {
  //Reconnect on timeout
  mongoose.connect("mongodb+srv://teymitee:4KdHUEJmd8w21t5h@yelpcamp-amcv1.mongodb.net/YelpCamp?retryWrites=true", options);
    db = mongoose.connection;
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIG
app.use(require("express-session")({
  secret: "Temitope created this application",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});


app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

let port = process.env.PORT || 3000;
app.listen(port);