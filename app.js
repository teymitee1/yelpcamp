const   express = require("express"),
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
let     commentRoutes = require("./routes/comments"),
        campgroundRoutes = require("./routes/campgrounds"),
        indexRoutes = require("./routes/index");

// mongoose.connect("mongodb://localhost/yelpcamp", {useNewUrlParser: true});
mongoose.connect("mongodb://teymitee:%40Conjugate1@cluster0-shard-00-00-amcv1.mongodb.net:27017,cluster0-shard-00-01-amcv1.mongodb.net:27017,cluster0-shard-00-02-amcv1.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true");

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

app.listen(3000, "127.0.0.1", () => {
    console.log("The YelpCamp Server Has Started");
});