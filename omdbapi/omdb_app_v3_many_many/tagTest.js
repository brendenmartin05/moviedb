var db = require('./models');

db.tag.findOrCreate({where: {name: "space-related"}}).spread(function(tag, created) {
  db.favorite.findById(1).then(function(favorite) {
    favorite.addTag(tag).then(function() {
      console.log(tag.get());
      console.log("--------");
      console.log(favorite.get());
    });
  })
});