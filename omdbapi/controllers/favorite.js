var db = require("../models");
var express = require("express");
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');


// at root/favorites
router.get("/", function(req, res){
    db.favorite.findAll().then(function(favList){
      res.render("favorites/index.ejs", {favList: favList});
    });
});

router.post("/", function(req, res){
    // res.send(req.body);
    db.favorite.findOrCreate({where: {
        title: req.body.title,
        year: req.body.year,
        poster: req.body.poster,
        imdbId: req.body.id
    // the thing created and a boolean telling if created or not
    }}).spread(function(favorite, created){
        res.redirect("movies/" + req.body.id)
    });
});

module.exports = router;