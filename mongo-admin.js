// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var mongo_express = require('mongo-express/lib/middleware')
var mongo_express_config = require('./mongo_express_config')

var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var app = express();

// Mount mongo-express administrator on /mongo-express
app.use('/', mongo_express(mongo_express_config))

var port = process.env.PORT || 1337;
app.listen(port, function() {
  console.log(`* mongo admin running on port ${port}.`);
});
