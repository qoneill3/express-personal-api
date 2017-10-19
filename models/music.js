const mongoose = require('mongoose');
				Schema = mongoose.Schema;

let musicSchema = new Schema ({
		artist: String,
		album: String,
		song: String,
		date: String
});

let Music = mongoose.model('Music', musicSchema);

module.exports = Music;