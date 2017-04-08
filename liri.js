var sourceFile = require('./keys.js');
var twitterKeys = sourceFile.twitterKeys;
var command = process.argv[2];

if(command === "my-tweets"){
	//show last 20 tweets and when they were created in your terminal window
} else if(command === "spotify-this-song"){
	//take argv[3] and run though spotify api to return 
	// artist
	//song name 
	//preview link of the song
	//album
	// if no song provided, default to "the sign" - ace of base
} else if(command === "movie-this"){
	// take argv[3] and run through omdb and console log
	// title
	// year
	// imdb rating
	// country produced
	// language
	// plot
	// actors
	// rotten tomatoes rating
	// rotten tomatoes url
	// if argv[3] === "" // !argv[3]
		// default to Mr.Nobody 
} else if(command === "do-what-it-says"){
	// using fs package, take the text inside of random.txt and use it to call one of Liri's commands
	// should run spotify-this-song for song in text file
}