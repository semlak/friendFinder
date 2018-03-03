'use strict'


// Friends(DATA)
// =============================================================

const friends = require("../data/friends");



// Survey questions (DATA);
const surveyQuestions = require("../data/questions");


Array.prototype.isEqual = function(arr) {
	if (this.length !== arr.length) return false;
	return this.every((element, i) => arr[i] === element);
}


const compareToFriend = (user, friend) => {
	const scoreDiffs = user.scores.map((score, i) => Math.abs(score - friend.scores[(i)]));
	const totalDiff = scoreDiffs.reduce((a, b) => a + b, 0);
	// return totalDiff;
	return user.scores.map((score, i) => Math.abs(score - friend.scores[(i)])).reduce((a, b) => a + b, 0);
}

let getMostCompatibleFriend = (user, friends) => {
	let currentLowestDiff = user.scores.length * 5;
	return friends.reduce((bestCurrentMatch, friend) => {
		// prevent returning a person with the same name AND same scores.
		// same scores and different name same name and different scores okay.
		if (friend === user || (friend.name === user.name && friend.scores.isEqual(user.scores))) return bestCurrentMatch;
		let diff = compareToFriend(user, friend);
		if (diff < currentLowestDiff) {
			currentLowestDiff = diff;
			return friend;
		}
		else {
			return bestCurrentMatch;
		}
	}, {})
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



module.exports = (app, express) => {

	app.get("/api/survey", (req, res) => {
		res.json(surveyQuestions);
		res.end();
	})

	app.get("/api/friends", (req, res) => {
		res.json(friends)
		res.end();
	})

	app.post("/api/friends", (req, res) => {
		let userInput = req.body;
		let bestMatch = getMostCompatibleFriend(userInput, friends);
		friends.push(userInput);
		// console.log(friends);
		res.json(bestMatch);
		// do some stuff.
	});

}
