var middleWareObj = {};
var hotl = require("../models/hotel");


middleWareObj.isLoggedin = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do that!");
    res.redirect("/login");
};

middleWareObj.givePermissions = function(req,res,next){
    if(req.isAuthenticated()){
        hotl.findById(req.params.id,function(err,foundHotel){
            if(err){
                req.flash("error","Hotel not found");
                console.log(err);
                res.redirect("back");
            }else{
                if(foundHotel.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error","You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error","You need to be logged in to do that!");
        res.redirect("back");
    }
};

module.exports = middleWareObj;