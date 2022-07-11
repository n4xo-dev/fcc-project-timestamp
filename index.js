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
  
  const paramDate = req.params.date;
  let date = new Date(paramDate);
  
  if(isNaN(date.getTime()))
    date = new Date(Number(paramDate));
  if(isNaN(date.getTime())){
    res.json({ "error": "Invalid Date" });
    return;
  }

  let parsedDate = Date.parse(paramDate);
  const unix = isNaN(parsedDate) ? date.getTime() : parsedDate;
  const utc = date.toUTCString();

  console.log(paramDate, date, unix, utc);
  res.json({
    "unix": unix,
    "utc": utc
  })

})

// Current Time endpoint
app.get("/api", (req, res) => {
  res.json({
    "unix": Date.now(),
    "utc": new Date().toUTCString()
  });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
