// Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const favicon = require("serve-favicon");

// Friends(DATA)
// =============================================================

let friends = require("./data/friends");



// Survey questions (DATA);
let surveyQuestions = require("./data/questions");

console.log(surveyQuestions)
Array.prototype.isEqual = function(arr) {
	if (this.length !== arr.length) return false;
	return this.every((element, i) => arr[i] === element);
}


let compareToFriend = (user, friend) => {
	let scoreDiffs = user.scores.map((score, i) => Math.abs(score - friend.scores[(i)]));
	let totalDiff = scoreDiffs.reduce((a, b) => a + b);
	// return totalDiff;
	return user.scores.map((score, i) => Math.abs(score - friend.scores[(i)])).reduce((a, b) => a + b, 0);
}

let getMostCompatibleFriend = (user, friends) => {
	let currentLowestDiff = user.scores.length * 5;
	return friends.reduce((bestCurrentMatch, friend) => {
		// if (friend === user ) return bestCurrentMatch;
		if (friend === user || (friend.name === user.name && friend.scores.isEqual(user.scores))) return bestCurrentMatch;
		let diff = compareToFriend(user, friend);
		if (diff < currentLowestDiff) {
			currentLowestDiff = diff;
			return friend;
		}
		else {
			return bestCurrentMatch;
		}
	})
}

if (!String.prototype.quote)
    String.prototype.quote = function(){
        return JSON.stringify( this ); // since IE8
    }

// let user = friends[0];

// // friends.forEach(friend => console.log(friend.name, compareToFriend(user, friend)));
// // console.log(getMostCompatibleFriend(user,friends));
// friends.forEach(friend => {
// 	let match = getMostCompatibleFriend(friend,friends);
// 	console.log("for " + friend.name.quote(), match.name.quote(), compareToFriend(friend, match));
// })

// Sets up the Express App
// =============================================================
// var app = express();
let app = express()
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

var PORT = process.env.port || 3000;


// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());



// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public/html/home.html"));
});

app.get("/survey", (req, res) => {
	res.sendFile(path.join(__dirname, "public/html/survey.html"));
})

app.get("/assets/:directory/:filename", (req, res) => {
	console.log("requested request for file")
	let directory = req.params.directory;
	let filename = req.params.filename;
	console.log("filename:", filename);
	//filename includes path inside the public folder
	// check for existance of filename;  ADD LATER

	res.sendFile(path.join(__dirname, "public", directory, filename));

})

app.get("/api/survey", (req, res) => {
	res.json(surveyQuestions);
	res.end();
})

// app.get("/add", function(req, res) {
// 	res.sendFile(path.join(__dirname, "add.html"));
// });

// // Get all characters
// app.get("/all", function(req, res) {
// 	res.json(characters);
// });

app.get("/api/friends", (req, res) => {
	res.json(friends)
	res.end();
})

app.post("/api/friends", (req, res) => {
	let surveyResponses = req.body;

	let bestMatch = getMostCompatibleFriend(surveyResponses, friends);
	res.json(bestMatch);
	// do some stuff.
})
// Search for Specific Character (or all characters) - provides JSON
// app.get("/api/:characters?", function(req, res) {
// 	var chosen = req.params.characters;

// 	if (chosen) {
// 		console.log(chosen);

// 		for (var i = 0; i < characters.length; i++) {
// 			if (chosen === characters[i].routeName) {
// 				return res.json(characters[i]);
// 			}
// 		}
// 		return res.json(false);
// 	}
// 	return res.json(characters);
// });

// Create New Characters - takes in JSON input
// app.post("/api/new", function(req, res) {
// 	// req.body hosts is equal to the JSON post sent from the user
// 	// This works because of our body-parser middleware
// 	var newcharacter = req.body;
// 	// Using a RegEx Pattern to remove spaces from newCharacter
// 	// You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
// 	newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

// 	console.log(newcharacter);

// 	characters.push(newcharacter);

// 	res.json(newcharacter);
// });

// Starts the server to begin listening
// =============================================================
let go = _ => app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});


go();