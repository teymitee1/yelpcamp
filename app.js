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

var url = process.env.DATABASEURL || "mongodb://localhost/yelpcamp";
mongoose.connect(url, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIG
app.use(require("cookie-session")({
  name: "session",
  keys: "sessionId",
  maxAge: 30*10000
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

const host = process.env.IP || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, function(){
  console.log("YelpCamp is running");
})
