var db = require('./models');

db.favorite.find().then(function(favorite){
  // favorite.createComment({
  //   body:'this is a test comment'
  // }).then(function(comment){
  //   console.log(comment);
  // });
  favorite.getComments().then(function(comments){
    console.log(comments)
  });
});