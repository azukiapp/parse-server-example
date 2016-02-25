// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');
var request = require('request');
var os = require('os');

var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || '' //Add your master key here. Keep it secret!
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Config static middleware for assets
app.use('/public', express.static(__dirname + '/public'));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Make a low level POST request
app.get('/post', function(req, res) {
  request.post({
    url:['http://', req.hostname, '/parse/classes/GameScore'].join(""),
    headers: { "X-Parse-Application-Id": "myAppId" },
    json: {
      "score":1337,"playerName":"Sean Plott","cheatMode":false
    }
  }, function optionalCallback(err, httpResponse, body) {
    res.send(body);
  });
});

// Make a low level GET request
app.get('/get/:id', function(req, res) {
   request.get({
    url:['http://', req.hostname, '/parse/classes/GameScore/', req.params.id].join(""),
    headers: { "X-Parse-Application-Id": "myAppId" }
  }, function optionalCallback(err, httpResponse, body) {
    res.send(body);
  });
});

var port = process.env.PORT || 1337;
app.listen(port, function() {
    console.log('* parse-server-example running on port ' + port + '.');
});
