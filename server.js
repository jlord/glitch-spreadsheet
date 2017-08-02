var url = require('url')

var express = require('express')
var app = express()

var getSheet = require('./getSheet.js')

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  var key = url.parse(request.url, true).query
  if (Object.keys(key).length > 0) {
    // If they submit a key, get the data
    getSheet(key.key, function gotData (data) {
      if (data) {
        // If there is data, send it!
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.send(data)
      } else {
        // If no data, load the main page
        response.sendFile(__dirname + '/views/index.html')
      }
    })
  } else  {
    // If there is no key, load the main page
    response.sendFile(__dirname + '/views/index.html')
  }
})

// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
