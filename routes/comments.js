let express = require("express"),
    router = express.Router({ mergeParams: true }),
    Campground = require("../models/campground"),
    Comment = require("../models/comments"),
    middlewareObj = require("../middleware");

//New Comment
router.get("/new", middlewareObj.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console, log(err);
        } else {
            res.render("comments/new", { campground: campground });
        }
    });
});

//Comment Creation
router.post("/", middlewareObj.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    req.flash("error", "Something went wrong ")
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    req.flash("success", "Successfully added a comment")
                    res.redirect('/campgrounds/' + foundCampground._id)
                }
            });
        }
    });
});

//COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middlewareObj.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", { campground_id: req.params.id, comment: foundComment });
        }
    })
});

//COMMENT UODATE ROUTE

router.put("/:comment_id", middlewareObj.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

//COmment Delete route

router.delete("/:comment_id", (req, res) => {
    Comment.findByIdAndDelete(req.params.comment_id, (err) => {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

module.exports = router;