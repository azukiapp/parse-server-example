# parse-server-example

Example project using the [parse-server](https://github.com/ParsePlatform/parse-server) module on Express.

Read the full Parse Server guide here: https://github.com/ParsePlatform/parse-server/wiki/Parse-Server-Guide

### For Local Development

#### With `Run Project` Button

Click the button bellow to quickly and safely install this project on your local machine.

[![Run project](https://s3-sa-east-1.amazonaws.com/assets.azk.io/run-project.png)](http://run.azk.io/start/?repo=run-project/parse-server-example)

The `Run Project` button employs `azk`, a lightweight open source orchestration tool that will automatically isolate and configure the application's environment for you.

Learn more about `azk` [here](https://github.com/azukiapp/azk).

#### Without It

* Make sure you have at least Node 4.3. `node --version`
* Clone this repo and change directory to it.
* `npm install`
* Install mongo locally using http://docs.mongodb.org/master/tutorial/install-mongodb-on-os-x/
* Run `mongo` to connect to your database, just to make sure it's working. Once you see a mongo prompt, exit with Control-D
* Run the server with: `npm start`
* By default it will use a path of /parse for the API routes.  To change this, or use older client SDKs, run `export PARSE_MOUNT=/1` before launching the server.
* You now have a database named "dev" that contains your Parse data
* Install ngrok and you can test with devices

### Getting Started With DigitalOcean

After you run this project locally using [`Run Project` button](#with-run-project-button), deploying to [DigitalOcean](http://digitalocean.com/) is very simple.

First, be sure you have SSH keys configured in your machine. If you don't have it yet (or if you aren't sure about it), just follow steps 1 and 2 of [this tutorial](https://help.github.com/articles/generating-ssh-keys/).

Next, put your [personal access token](https://cloud.digitalocean.com/settings/applications) into a `.env` file:

```bash
$ cd path/to/the/project
$ echo "DEPLOY_API_TOKEN=<YOUR-PERSONAL-ACCESS-TOKEN>" >> .env
```

Then, just run the following:

```bash
$ azk deploy
```

The `Run Project` button employs `azk`, a lightweight open source orchestration tool that will automatically isolate and configure the application's environment for you.

Find instructions for further resources (mostly customizations) to deploy to DigitalOcean using `azk` [here](http://docs.azk.io/en/deploy).

### Getting Started With Heroku + Mongolab Development

#### With the Heroku Button

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

#### Without It

* Clone the repo and change directory to it
* Log in with the [Heroku Toolbelt](https://toolbelt.heroku.com/) and create an app: `heroku create`
* Use the [MongoLab addon](https://elements.heroku.com/addons/mongolab): `heroku addons:create mongolab:sandbox`
* By default it will use a path of /parse for the API routes.  To change this, or use older client SDKs, run `heroku config:set PARSE_MOUNT=/1`
* Deploy it with: `git push heroku master`

### Getting Started With AWS Elastic Beanstalk

#### With the Deploy to AWS Button

<a title="Deploy to AWS" href="https://console.aws.amazon.com/elasticbeanstalk/home?region=us-west-2#/newApplication?applicationName=ParseServer&solutionStackName=Node.js&tierName=WebServer&sourceBundleUrl=https://s3.amazonaws.com/elasticbeanstalk-samples-us-east-1/eb-parse-server-sample/parse-server-example.zip" target="_blank"><img src="http://d0.awsstatic.com/product-marketing/Elastic%20Beanstalk/deploy-to-aws.png" height="40"></a>

#### Without It

* Clone the repo and change directory to it
* Log in with the [AWS Elastic Beanstalk CLI](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html), select a region, and create an app: `eb init`
* Create an environment and pass in MongoDB URI, App ID, and Master Key: `eb create --envvars DATABASE_URI=<replace with URI>,APP_ID=<replace with Parse app ID>,MASTER_KEY=<replace with Parse master key>`

### Getting Started With Microsoft Azure App Service

#### With the Deploy to Azure Button

[![Deploy to Azure](http://azuredeploy.net/deploybutton.png)](https://azuredeploy.net/)

#### Without It

A detailed tutorial is available here:
[Azure welcomes Parse developers](https://azure.microsoft.com/en-us/blog/azure-welcomes-parse-developers/)


### Getting Started With Google App Engine

1. Clone the repo and change directory to it 
1. Create a project in the [Google Cloud Platform Console](https://console.cloud.google.com/).
1. [Enable billing](https://console.cloud.google.com/project/_/settings) for your project.
1. Install the [Google Cloud SDK](https://cloud.google.com/sdk/).
1. Setup a MongoDB server.  You have a few options:
  1. Create a Google Compute Engine virtual machine with [MongoDB pre-installed](https://cloud.google.com/launcher/?q=mongodb).
  1. Use [MongoLab](https://mongolab.com/google/) to create a free MongoDB deployment on Google Cloud Platform.
1. Modify `app.yaml` to update your environment variables.
1. Delete `Dockerfile`
1. Deploy it with `gcloud preview app deploy`

A detailed tutorial is available here:
[Running Parse server on Google App Engine](https://cloud.google.com/nodejs/resources/frameworks/parse-server)

### Getting Started With Scalingo

#### With the Scalingo button

[![Deploy to Scalingo](https://cdn.scalingo.com/deploy/button.svg)](https://my.scalingo.com/deploy)

#### Without it

* Clone the repo and change directory to it
* Log in with the [Scalingo CLI](http://cli.scalingo.com/) and create an app: `scalingo create my-parse`
* Use the [Scalingo MongoDB addon](https://scalingo.com/addons/scalingo-mongodb): `scalingo addons-add scalingo-mongodb free`
* Setup MongoDB connection string: `scalingo env-set DATABASE_URI='$SCALINGO_MONGO_URL'`
* By default it will use a path of /parse for the API routes. To change this, or use older client SDKs, run `scalingo env-set PARSE_MOUNT=/1`
* Deploy it with: `git push scalingo master`

# Using it

Before using it, you can access a test page to verify if the basic setup is working fine [http://localhost:1337/test](http://localhost:1337/test).
Then you can use the REST API, the JavaScript SDK, and any of our open-source SDKs:

Example request to a server running locally:

```curl
curl -X POST \
  -H "X-Parse-Application-Id: myAppId" \
  -H "Content-Type: application/json" \
  -d '{"score":1337,"playerName":"Sean Plott","cheatMode":false}' \
  http://localhost:1337/parse/classes/GameScore
  
curl -X POST \
  -H "X-Parse-Application-Id: myAppId" \
  -H "Content-Type: application/json" \
  -d '{}' \
  http://localhost:1337/parse/functions/hello
```

Note: change `http://localhost:1337/` to `http://parse-server.dev.azk.io` if you are using `azk`.

Example using it via JavaScript:

```javascript
Parse.initialize('myAppId','unused');
Parse.serverURL = 'https://whatever.herokuapp.com';

var obj = new Parse.Object('GameScore');
obj.set('score',1337);
obj.save().then(function(obj) {
  console.log(obj.toJSON());
  var query = new Parse.Query('GameScore');
  query.get(obj.id).then(function(objAgain) {
    console.log(objAgain.toJSON());
  }, function(err) {console.log(err); });
}, function(err) { console.log(err); });
```

Example using it on Android:
```java
//in your application class

Parse.initialize(new Parse.Configuration.Builder(getApplicationContext())
  .applicationId("myAppId")
  .clientKey("myClientKey")
  .server("http://myServerUrl/parse/")   // '/' important after 'parse'
  .build());

ParseObject testObject = new ParseObject("TestObject");
testObject.put("foo", "bar");
testObject.saveInBackground();
```
Example using it on iOS (Swift):
```swift
//in your AppDelegate

Parse.initializeWithConfiguration(ParseClientConfiguration(block: { (configuration: ParseMutableClientConfiguration) -> Void in
  configuration.server = "https://<# Your Server URL #>/parse/" // '/' important after 'parse'
  configuration.applicationId = "<# Your APP_ID #>"
  configuration.clientKey = "<# Your CLIENT_KEY #>"
}))
```
You can change the server URL in all of the open-source SDKs, but we're releasing new builds which provide initialization time configuration of this property.
