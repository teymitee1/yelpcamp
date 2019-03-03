var express     =   require("express"),
    router      =   express.Router({mergeParams: true}),
    Campground  =   require("../models/campground"),
    Comment     =   require("../models/comments");

//New Comment
router.get("/new", isLoggedIn, (req, res)=>{
    Campground.findById(req.params.id, (err, campground)=>{
        if(err){
            console,log(err);
        }else {
            res.render("comments/new", {campground: campground});
        }
    });
});

//Comment Creation
router.post("/", isLoggedIn, (req, res)=>{
    Campground.findById(req.params.id, (err, foundCampground)=>{
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, (err, comment)=>{
                if(err){
                    console.log(err);
                }else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    res.redirect('/campgrounds/' + foundCampground._id)
                }
            });
        }
    });
});

//COMMENT EDIT ROUTE
router.get("/:comment_id/edit", (req, res)=>{
    Comment.findById(req.params.comment_id, (err, foundComment)=>{
        if(err){
            releaseEvents.redirect("back");
        }else {
            res.render("comments/edit", {campground_id : req.params.id, comment : foundComment});
        }
    })
});

//COMMENT UODATE ROUTE

router.put("/:comment_id", (req, res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment)=>{
        if(err){
            res.redirect("back");
        }else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

//MiddleWare
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;