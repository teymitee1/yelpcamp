var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comments");


    var data = [
        {
            name: "You Came Back From Work & Found This Strange Woman In Your Kitchen, What Will You Do?",
            image: "http://www.naijaloaded.com.ng/wp-content/uploads/2018/11/Big-woman.jpg",
            description: "Health and safety procedures must be followed by the employee during the training and induction day. This can be achieved by going through the manufacturers instruction on how the material will be moved and stored. If any problem arises, this can be done by informing the site supervisor and wait till the problem is solved."
        },
        {
            name: "Question Of The Day:- If Buhari Is A Folder On Your Computer, What Would You Be Saving Inside?",
            image: "http://www.naijaloaded.com.ng/wp-content/uploads/2018/11/67890987940.jpg",
            description: "Health and safety procedures must be followed by the employee during the training and induction day. This can be achieved by going through the manufacturers instruction on how the material will be moved and stored. If any problem arises, this can be done by informing the site supervisor and wait till the problem is solved."
        },
        {
            name: "REAL LIFE TALK!! Has Anything Ever Happened To You That Made You Say, “Ha, I Must Get This Money O”?",
            image: "http://www.naijaloaded.com.ng/wp-content/uploads/2018/11/header-20.jpg",
            description: "Health and safety procedures must be followed by the employee during the training and induction day. This can be achieved by going through the manufacturers instruction on how the material will be moved and stored. If any problem arises, this can be done by informing the site supervisor and wait till the problem is solved."
        }
    ];

function seedDB(){
    Campground.remove({}, (err)=>{
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