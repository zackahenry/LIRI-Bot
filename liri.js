var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

var spotify = new Spotify({
    id: "9e7a9cf241ec4e8cb37295f14225d2e0",
    secret: "7a09326a952441368976536cfb1adb69"
  });

var getArtistNames = function (artist) {
    return artist.name;
};

var getMyTweets = function() {

    var client = new Twitter(keys.twitterKeys);

    var params = {screen_name: 'Zack_HenrySEO'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
       // console.log(tweets);
            for(var i = 0; i<tweets.length; i++){
             console.log(tweets[i].created_at);
             console.log(' ');
             console.log(tweets[i].text);
        }
    }
 });
}

var getMeSpotify = function(songName) {
    if (songName === undefined) {
        songName = "What's my age again";
    };


    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
            }
            var songs = data.tracks.items;
            for(var i=0; i<songs.length; i++) {
                console.log(i);
                console.log('artist(s): ' + songs[i].artists.map(getArtistNames));
                console.log('Song name: ' + songs[i].name);
                console.log('Preview song: ' + songs[i].preview_url);
                console.log('Album: ' + songs[i].album.name);
                console.log('--------------------------------------------------'); 
            }
        });
};

var getMeMovie = function(movieName) {
request('http://www.omdbapi.com/?t='+ movieName +'&y=&plot=full&tomatoes=true&apikey=40e9cece', function (error, response, body) {
    if (!error && response.statusCode == 200) {

        var jsonData = JSON.parse(body);

        console.log('Title: ' + jsonData.Title);
        console.log('Year: ' + jsonData.Year);
        console.log('Rating: ' + jsonData.Rated);
        console.log('IMDB Rating: ' + jsonData.imdbRating);
        console.log('Country: ' + jsonData.Country);
        console.log('Language: ' + jsonData.Language);
        console.log('Plot: ' + jsonData.Plot);
        console.log('Actors: ' + jsonData.Actors);
        console.log('Rotten Tomatoes Rating: ' + jsonData.tomatoRating);
        console.log('Rottent Tomatoes URL: ' + jsonData.tomatoURL);
        }
    });
};

var doWhatItSays = function() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) throw err;

        var dataArr = data.split(',');

        if (dataArr.length == 2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length ==1){ 
            pick(dataArr[0]);
        }
    });
}

var pick = function(caseData, functionData) {
    switch(caseData){
        case 'my-tweets' :
            getMyTweets();
            break;
        case 'spotify-this-song' :
            getMeSpotify(functionData);
            break; 
        case 'movie-this' :
            getMeMovie(functionData);
            break;   
        case 'do-what-it-says' :
            doWhatItSays();
            break;   
        default:
        console.log('LIRI does not know that')
    }
}

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
}

runThis(process.argv[2], process.argv[3]);

