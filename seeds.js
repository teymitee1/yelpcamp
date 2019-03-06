let mongoose = require("mongoose");
let Campground = require("./models/campground");
let Comment = require("./models/comments");


function seedDB() {
    Campground.remove({}, (err) => {
        //     if(err){
        //         console.log(err);
        //     }
        //     console.log("All Campgrounds Removed");
        // });
        // data.forEach((seed)=>{
        //     Campground.create(seed, (err, campground)=>{
        //         if(err){
        //             console.log(err);
        //         }else {
        //             console.log("campground created");
        //             Comment.create({
        //                 text: "This place is cool, but i wish it had internet",
        //                 author: "Temitope"
        //             }, (err, comment)=>{
        //                 if(err){
        //                     console.log(err);
        //                 }else {
        //                     campground.comments.push(comment);
        //                     campground.save();
        //                     console.log("Comments created")
        //                 }
        //             });
        //         }
        //     });
    });
}

module.exports = seedDB;