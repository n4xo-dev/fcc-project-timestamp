// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Timestamp endpoint
app.get("/api/:date", (req, res) => {
  
  const validDate = /^\d{4}-\d{2}-\d{2}$|\d{13}/;
  if(!validDate.test(req.params.date)){
    res.json({ "error": "Invalid Date" });
    return;
  }

  const date = new Date(req.params.date);
  res.json({
    "unix": Date.parse(req.params.date),
    "utc": date.toUTCString()
  })

})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
