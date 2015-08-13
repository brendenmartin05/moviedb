var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var ejsLayouts = require('express-ejs-layouts');

var app = express();

app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
  res.render("main/index.ejs");
});

app.use('/movies',require('./controllers/movies.js'));
app.use('/favorites',require('./controllers/favorites.js'));
app.use('/tags',require('./controllers/tags.js'));

app.listen(3000);



