'use strict'

var google = require('googleapis');
var vision = google.vision('v1');
var fs = require('fs');

//REMOVE!!
var apiKey = process.env.API_KEY;

exports.process = function(filename, callback) {

    var postData = {};
    postData.resource = {};
    postData.resource.requests = [];

    var request = {}
    request.image = {};
    request.features = [];
    request.imageContext = {};

    var bs64 = new Buffer((fs.readFileSync(filename))).toString("base64");
    request.image.content = bs64;

    var feature = {};
    feature.type = "LABEL_DETECTION";
    feature.maxResults = 10;
    request.features.push(feature);

    postData.resource.requests.push(request);
    postData.auth = apiKey;

    vision.images.annotate(postData, function(err, result)  {
        if(err) {
            console.log("Google Vision API Error");
            console.log(err);
            return err;
        } else {
            callback(result);
        }
    });
}