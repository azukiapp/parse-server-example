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

// Lets enable CORS to test in production
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});


app.get('/deployment', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/deployment.html'));
});

// Make a low level POST request
app.get('/post/:ip*?/:id*?', function(req, res) {
  var server = req.params.ip || process.env.DOMAIN || req.hostname;
  var url = `http://${server}/parse/classes/GameScore`;
  var appId = req.params.id || "myAppId";

  console.log("url", url);
  console.log("appId", appId);

  request.post({
    url: url,
    headers: { "X-Parse-Application-Id": appId },
    json: {
      "score":1337,"playerName":"Sean Plott","cheatMode":false
    }
  }, function (err, httpResponse, body) {
    res.send(err || body);
  });
});

// Make a low level GET request
app.get('/get/:id', function(req, res) {
  var server = process.env.DOMAIN || req.hostname;
  request.get({
    url: `http://${server}/parse/classes/GameScore/${req.params.id}`,
    headers: { "X-Parse-Application-Id": "myAppId" }
  }, function (err, httpResponse, body) {
    res.send(err || body);
  });
});

var port = process.env.PORT || 1337;
app.listen(port, function() {
  console.log(`* parse-server-example running on port ${port}.`);
});
