var express = require('express');
var router = express.Router();
var db = require('../models');

// GET http://localhost:3000/favorites
router.get('/',function(req,res){
  db.favorite.findAll({
    include:[db.comment, db.tag]
  }).then(function(favorites){
    res.render('favorites/index',{favorites:favorites});
  });
});

// GET http://localhost:3000/favorites/tags/:id
router.get('/tags/:id',function(req,res){
  db.favorite.findAll({
    include: [{
      model: db.comment
    },
    {
      model: db.tag,
      where: {id: req.params.id}
    }
    ]
  }).then(function(favorites){
    res.render('favorites/index',{favorites:favorites});
  });
});

// POST http://localhost:3000/favorites
router.post('/',function(req,res){
  // res.send(req.body)
  db.favorite.create({
    title:req.body.title,
    year:req.body.year,
    poster:req.body.poster,
    imdbId:req.body.imdbId
  }).then(function(movie){
    res.redirect('/movies/'+movie.imdbId);
  });
});

// DELETE http://localhost:3000/favorites/:id
router.delete('/:id',function(req,res){
  db.favorite.destroy({where:{id:req.params.id}}).then(function(){
    res.redirect('/favorites');
  })
});


// GET http://localhost:3000/favorites/:id/comments
router.get('/:id/comments',function(req,res){
  // res.send(req.params);
  db.favorite.find({
    where:{id:req.params.id},
    include:[db.comment]
  }).then(function(favorite){
    res.render('comments/index',{
      favorite:favorite
    });
  });
});

router.post('/:id/comments',function(req,res){
  db.favorite.findById(req.params.id).then(function(favorite){
    favorite.createComment({body:req.body.body}).then(function(comment){
      res.redirect('/favorites/' + favorite.id + '/comments');
    });
  });
  // res.send({params:req.params,body:req.body});
});

router.get('/:id/tags/new', function(req, res) {
  res.render('tags/new', {favoriteId: req.params.id});
});

router.post('/:id/tags', function(req, res) {
  // res.send(req.body);
  db.favorite.findById(parseInt(req.params.id)).then(function(favorite) {
    // res.send(favorite.get());
    db.tag.findOrCreate({
      where: {name: req.body.tagName}
    }).spread(function(tag, created) {
      // res.send(tag.get());
      favorite.addTag(tag).then(function() {
        res.redirect('/favorites');
      });
    });
  });
});

module.exports = router;






