'use strict'

exports.route = function(req,res) {

    res.render("home", {message: 'This is the home', page_heading: "Google Vision Demo"});

}