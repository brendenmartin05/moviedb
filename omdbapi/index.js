var express = require('express');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');


app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.use(ejsLayouts);

app.get("/", function(req, res) {
  res.render("main/index.ejs");
});

app.get("/movies/search", function(req, res){
  res.render('movies/search.ejs');
});

app.get("/movies", function(req, res) {
  var searchTerm = req.query.q;
  var url = "http://www.omdbapi.com/?s=" + searchTerm;
  request(url, function(error, response, data) {
    res.render("movies/index", {movies: JSON.parse(data)});
  });
});


app.get("/movies/:id", function(req, res) {
  var movieId = req.params.id;
  var url = "http://www.omdbapi.com/?i=" + movieId + "&plot=full";

  request(url, function(error, response, data) {
    res.render("movies/show", {movie: JSON.parse(data)})
  });

});

app.listen(3000);