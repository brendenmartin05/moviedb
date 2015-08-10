var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

// constructor
function Movie(title, id){
  this.title = title;
  this.id = id;


}

// fake database
var movies = [
  new Movie("Superbad"),
  new Movie("Dark Knight")
];

// Homepage with search function
app.get("/",function(req,res){
  res.render('index.ejs');
});

// Movie results
// app.get("/movies", function(req, res){
//   res.render('movies/show.ejs');
// });



app.get("/movies", function(req, res){
  var title = req.query.t
  var url = 'http://www.omdbapi.com/?s=' + title
  request(url, function(error, response, data){
    var movieData = JSON.parse(data);
    var results = movieData.Search

    if (results){
  res.render('movies/show.ejs',
    {myMovies: results});
}
});

});



// Displays specific movie by ID
app.get("/movieinfo/:id", function(req,res){
  var id = req.params.id
  var url = "http://www.omdbapi.com/?i=" + id + "&tomatoes=true"

  request(url, function(error, response, data){
    var thisMovieData = JSON.parse(data)
    var thisResult = thisMovieData.Plot
    var rating = parseInt(thisMovieData.imdbRating)

    if(thisResult){
      res.render('movies/movieinfo',{
        description: thisMovieData,
        rating: rating
      });
    }
  });

});



app.listen(3000);