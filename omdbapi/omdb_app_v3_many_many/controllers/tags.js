var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res) {
  db.tag.findAll({
    include: [db.favorite]
  }).then(function(tags) {
    tags.sort(function(a, b) {
      var aFavorites = a.favorites.length;
      var bFavorites = b.favorites.length;
      if (aFavorites < bFavorites) {
        return 1;
      } else if (aFavorites > bFavorites) {
        return -1;
      }
    });
    res.render('tags/index', {tags: tags});
  })
});

module.exports = router;