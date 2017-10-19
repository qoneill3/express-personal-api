// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

 var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
  
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/qoneill3/express-personal-api.git", 
    base_url: "https://dashboard.heroku.com/apps/lit-brushlands-30525", 
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Little run down on Q"}, 
      {method: "GET", path: "/api/music", description: "Index of some of my favorite songs"},
      {method: "GET", path: "/api/music/:id", description: "Shows just one of these songs"},
      {method: "POST", path: "/api/music/:id", description: "Adds to the list of favorite songs"},
      {method: "PUT", path: "/api/music/:id", description: "Updates a specific song"},
      {method: "DELETE", path: "/api/music/:id", description: "Get rid of one of these songs(but your not gonna want to)"} 
    ]
  });
});

//Profile route
app.get('/api/profile', function(req, res) {
  res.json({
    name: "Quinn O'Neill",
    github_link: "https://github.com/qoneill3",
    state: "CO",
    city: "Denver",
    interests: ["Basketball, Football, Music, Computers"]

  });
});

//Music index GET
app.get('/api/music', function(req, res) {
  db.Music.find({}, function(err, music) {
    if (err) {return console.log("Error: " + err); }
    res.json(music);
  });
});


//Get by ID
app.get('/api/music/:id', function(req, res) {
  db.Music.findOne({_id : req.params.id}, function(err, data) {
    res.json(data);
  });
});


//Create
app.post('/api/music', function(req, res) {
  var newMusic = new db.Music({
    artist: req.body.artist,
    album: req.body.album,
    song: req.body.song,
    date: req.body.date
  });

  newMusic.save(function(err, music) {
    if (err) {
      return console.log("Save error " + err);
    }
    console.log("Saved " + movie.song);
    res.json(music);
  });
});


//Update
app.put('/api/music/:id', function(req, res) {
  db.Music.findOne({_id: req.params.id}, function(err, music) {
    if (err) {
      console.log("Error: " + err);
    }
    music.artist = req.body.artist;
    music.album = req.body.album;
    music.song = req.body.song;
    music.date = req.body.date;
    msuic.save();
    res.json(music);
  });
});

//Delete
app.delete('/api/music/:id', function(req, res) {
  var musicId = req.params.id;
  db.Music.findOneAndRemove({_id: musicId}, function(err, deletedMusic) {
    res.send("Music was succesfully deleted!");
  });
});


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
