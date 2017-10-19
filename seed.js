// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

// var db = require('./models');

// var new_campsite = {description: "Sharp rocks. Middle of nowhere."}

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })

var db = require('./models');

var music_list = [
{
	artist: "Gucci Mane",
	album: "The State vs. Radric Davis",
	song: "Lemonade",
	date: "December 8, 2009"
},
{
	artist: "Weezy F. Baby",
	album: "Tha Carter III",
	song: "Mrs. Officer",
	date: "June 10, 2008"
},
{
	artist: "21 Savage",
	album: "ISSA",
	song: "Bank Account",
	date: "July 7, 2017"
},
{
	artist: "Blackstreet",
	album: "Another Level",
	song: "No Diggity",
	date: "1996"
}
];

db.Music.create(music_list, function(err, music) {
	if (err) {
		return console.log("Error:", err);
	}
	console.log("Created new music", music._id);
	process.exit();
});
