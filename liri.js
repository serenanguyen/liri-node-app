var sourceFile = require('./keys.js');
var twitterKeys = sourceFile.twitterKeys;
var Twitter = require('twitter');
var command = process.argv[2];
var client = new Twitter(twitterKeys);
var request = require("request");

function search(){
	if(command === "my-tweets"){
		tweets();
			//show last 20 tweets and when they were created in your terminal window

		} else if(command === "spotify-this-song"){
				if(process.argv[3]){
				spotifySearch();
			} else{
				process.argv[3] = "the sign"
				spotifySearch();
			}
	
			//take argv[3] and run though spotify api to return 
			// artist
			//song name 
			//preview link of the song
			//album
			// if no song provided, default to "the sign" - ace of base
		} else if(command === "movie-this"){
			if(process.argv[3]){
				movieSearch();
			} else{
				process.argv[3] === "Mr.Nobody"
				movieSearch();
			}
			
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
			readTxt();
			// using fs package, take the text inside of random.txt and use it to call one of Liri's commands
			// should run spotify-this-song for song in text file
	
		}
}; search();

function readTxt(){
	var fs = require("fs");
	fs.readFile("random.txt", "utf8", function(err,data){
		data = data.split(",");
		command = data[0];
		process.argv[3] = data[1];
		search();
	})
};

function spotifySearch(){
	//go through items search for name = song and then find info for that index item 
	var spotify = require('spotify');
	var args = process.argv;
	var song = args[3].toLowerCase();
	var index = 0;
	for (var i=4; i < args.length; i++){
		song = song+" "+args[i];
	}
	spotify.search({type:'track',query: song}, function(err, data){
		if(err){
			console.log('Error: '+err);
			return;
		}
		// for all items if the track name includes the song search, store the index and stop (find the first instance of a match)
		for(i=0;i<data.tracks.items.length;i++){
			var result = data.tracks.items[i].name.toLowerCase();
			if(result.includes(song)){
				index = i;
				break;
			}
		};
		// use the stored index to grab rest of info 	
		var artist = data.tracks.items[index].artists[0].name 
		var track = data.tracks.items[index].name
		var preview = data.tracks.items[index].preview_url
		var album = data.tracks.items[index].album.name
		console.log("artist: "+artist);
		console.log("track: "+track);
		console.log("album: "+album);
		console.log("preview: "+preview);		

	})


}
function movieSearch(){
	
	var args = process.argv;
	var movieName = args[3];
	for (var i=4; i < args.length; i++){
		movieName = movieName+"+"+args[i];
	} console.log(movieName);
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";
	request(queryUrl, function(error, response, body){
		if(!error && response.statusCode === 200){
			var response = JSON.parse(body)
			var rtValue = response.Ratings.find(function(rating){
				return rating.Source === 'Rotten Tomatoes';
			}).Value;			
			console.log(response);
			console.log("Title: "+response.Title);
			console.log("Year: "+response.Year);
			console.log("IMDB Rating: "+response.imdbRating);
			console.log("Country: "+response.Country);
			console.log("Language: "+response.Language);
			console.log("Plot: "+response.Plot);
			console.log("Cast: "+response.Actors);
			console.log("Rotten Tomatoes Rating: "+rtValue);
			// console.log("Rotten Tomatoes URL: "+response.Title);

		}
	});
};

function tweets(){
		var params = {screen_name: 'serenanguyen_', count: 20};
	client.get('statuses/user_timeline', params, function(error,tweets,response){
		if(!error){
			for(i=0;i<tweets.length;i++){
				console.log("----------------------------------------------------");
				console.log(tweets[i].text);
				console.log(tweets[i].created_at);
				console.log("----------------------------------------------------");			
			};
		
		} else {
			console.log(error);
		}
	});
}