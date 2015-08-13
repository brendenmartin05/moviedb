var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');

//GET http://localhost:3000/movies
router.get("/", function(req, res) {
  var searchTerm = req.query.q;
  var url = "http://www.omdbapi.com/?s=" + searchTerm;
  request(url, function(error, response, data) {
    res.render("movies/index", {movies: JSON.parse(data)});
  });
});

//GET http://localhost:3000/movies/:id
router.get("/:id", function(req, res) {
  var movieId = req.params.id;
  var url = "http://www.omdbapi.com/?i=" + movieId + "&plot=full";
  request(url, function(error, response, data) {
    db.favorite.find({where:{imdbId:movieId}}).then(function(favorite){
      // res.send(movie);
      res.render("movies/show", {
        movie: JSON.parse(data),
        favorite:favorite
      })
    });
  });
});

module.exports = router;