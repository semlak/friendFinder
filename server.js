// Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const favicon = require("serve-favicon");


// Sets up the Express App
// =============================================================
// var app = express();
const app = express()
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

const port = process.env.PORT || 3000;


// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());



// Routes
// =============================================================
require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes")(app);






const go = _ => app.listen(port, function() {
	console.log("App listening on PORT " + port);
});


go();