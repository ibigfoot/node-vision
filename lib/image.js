'use strict'

var vision = require('./vision');
var fs = require('fs');
var https = require('https');

// store in an accessilbe place. Will be temporary file storage.
var tempFile = __dirname + '/../public/images/tempFile.jpg';

// returns JSON
exports.route = function(req, response) {
    
    var uri = decodeURIComponent(req.body.urlVal);

    var resObj = {};
    resObj.success = false;
    response.setHeader('Content-Type', 'application/json');
    
    if(!uri.startsWith("http://") || !uri.startsWith("https://")) {
        resObj.message = 'Invalid URI ['+uri+'].'
        resObj.message += '\nPlease supply a link to the image (http or https)';
        response.send(JSON.stringify(resObj));
    } else {
        // if old file is present, clean
        if(fs.existsSync(tempFile)) {
            fs.unlinkSync(tempFile);
        }
        var file = fs.createWriteStream(tempFile).on('error', function(err){
            console.log(JSON.stringify(err));
            resObj.message = 'We have an error';
            resObj.error = JSON.stringify(err);
            response.send(JSON.stringify(resObj));
        });
        https.get(uri, function(res) {
            // wait for file to be written before using the callback
            res.pipe(file).on('close', function() {
                vision.process(tempFile, function(data) {
                    resObj.success = true;
                    resObj.data = data;
                    resObj.imgSrc = "/images/tempFile.jpg?"+new Date().getTime();
                    console.log(JSON.stringify(resObj));
                    response.send(JSON.stringify(resObj));
                });
            });
        }).on('error', function(err){
            console.log(JSON.stringify(err));
            resObj.message = 'We have an error';
            resObj.error = JSON.stringify(err);
            response.send(JSON.stringify(resObj));
        });
    }

    
}
