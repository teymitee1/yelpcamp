let express     =   require("express"),
    router      =   express.Router(),
    passport    =   require("passport"),
    User        =   require("../models/user");

//Root Route
router.get("/", (req, res)=>{
    res.render("landing");
});

//Show register form
router.get("/register", (req, res)=>{
    res.render("register");
});

//Sign up logic Route
router.post("/register", (req, res)=>{
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            req.flash("error", err.message)
            return res.render("register");
        }
        passport.authenticate("local")(req, res, ()=>{
            req.flash("success", "Werlcome to YelpCamp" + " " + user.username)
            res.redirect("/campgrounds")
        });
    });
});

//Login form
router.get("/login", (req, res)=>{
    res.render("login");
});

//Login Logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), (req, res)=>{
});

//Logout
router.get("/logout", (req, res)=>{
    req.logout();
    req.flash("success", "Logged you out Successfully");
    res.redirect("/campgrounds");
})

module.exports = router;