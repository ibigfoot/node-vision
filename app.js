'use strict'

var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var home = require('./lib/home');
var image = require('./lib/image');

var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
// body parser for form parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var hbs = exphbs.create({
    defaultLayout: 'main'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', home.route);
app.post('/imageUrl', image.route);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});