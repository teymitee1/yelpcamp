var express     =   require("express"),
    router      =   express.Router(),
    Campground  =   require("../models/campground");

//INDEX - show all campgrounds
router.get("/", (req, res)=>{
    Campground.find({}, (err, allCampgrounds)=>{
        if(err){
            console.log(err)
        }else {
            res.render("campgrounds/campgrounds",{campgrounds:allCampgrounds, currentUser: req.user});
        }
    });
});

//CREATE - add new campground to DB
router.post("/", isLoggedIn, (req, res)=>{
    var name = req.body.name;
    var image = req.body.image;
    var desc  = req.body.description;
    var author  = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author: author};
    Campground.create(newCampground, (err, newlyCreated)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
router.get("/new", isLoggedIn, (req, res)=>{
    res.render("campgrounds/new");
});

//Show - shows more info about one campground
router.get("/:id", (req, res)=>{
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground)=>{
        if(err){
            console.log(err)
        }else {
            res.render("campgrounds/Show", {campground: foundCampground});
        }
    });
    
});

//EDIT ROUTE
router.get("/:id/edit", checkCampgroundOwnership, (req, res)=>{
    Campground.findById(req.params.id, (err, foundCampground)=>{
        if(err){
            res.redirect("/campgrounds")
        }else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
    
});
//UPDATE ROUTE
router.put("/:id", checkCampgroundOwnership, (req, res)=>{
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground)=>{
        if(err){
            res.redirect("/campgrounds")
        }else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    });
});

//Destroy Campground Route
router.delete("/:id", checkCampgroundOwnership, (req, res)=>{
   Campground.findByIdAndRemove(req.params.id, (err)=>{
       if(err){
           res.redirect("/campgrounds");
       }else {
        res.redirect("/campgrounds");
       }
   });
});

//MiddleWare
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground)=>{
            if(err){
                res.redirect("back");
            }else {
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });
    }else {
        res.redirect("back");
    }
}
module.exports = router;