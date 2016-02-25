$(document).ready(function(){
  var Config = {}

  Config.getUrl = function() {
    if (url) return url;
    var port = window.location.port;
    var url = window.location.protocol + '//' + window.location.hostname;
    if (port) url = url + ':' + port;
    return url;
  }

  // Deals with Steps UI
  var Steps = {};

  Steps.buildParseUrl = function() {
    var url = Config.getUrl();
    $('#parse-url').html(url + '/parse');
  }

  Steps.bindPostBtn = function() {
    $('#post-btn').click(function(e){
      ParseData.postData();
      e.preventDefault();
    });
  }

  Steps.enableGetButton = function() {
    $('#step-2').removeClass('step--disabled');
  }

  Steps.bindGetBtn = function() {
    $('#get-btn').click(function(e){
      ParseData.getData();
      e.preventDefault();
    });
  }

  Steps.prepareSecondStep = function(data) {
    $('#step-1').addClass('step--disabled');
    $('#post-btn').addClass('success').html("✓  POSTED");
    $('#post-pre').html('Output: ' + JSON.stringify(data)).slideDown();
    Store.objectId = JSON.parse(data).objectId;
    console.log('Boject', Store.objectId);
    this.enableGetButton();
    this.bindGetBtn();
  }

  Steps.finishSecondStep = function(data) {
    $('#get-btn').addClass('success').html('✓  Fetched');
    $('#get-pre').html('Output: ' + JSON.stringify(data)).slideDown();
    this.showWorkingMessage();
  }

  Steps.showWorkingMessage = function() {
    $('#step-2').addClass('step--disabled');
    $('#step-3').delay(500).slideDown().removeClass('step--disabled');
  }

  // Cache re-usable data
  var Store = {
    objectId: ""
  };

  var XHR = {}
  XHR.setup = function(callback) {
    this.xhttp = new XMLHttpRequest();
    var _self = this;
    var cb = callback;
    this.xhttp.onreadystatechange = function() {
      if (_self.xhttp.readyState == 4 && _self.xhttp.status >= 200 && _self.xhttp.status <= 299) {
        cb(_self.xhttp.responseText);
      }
    };
  }

  XHR.POST = function(json, callback) {
    this.xhttp.open("POST", Config.getUrl() + "/parse/classes/GameScore", true);
    this.xhttp.setRequestHeader("X-Parse-Application-Id", "myAppId");
    this.xhttp.setRequestHeader("Content-type", "application/json");
    this.xhttp.send(JSON.stringify(json));
  }

  XHR.GET = function(callback) {
    this.xhttp.open("GET", Config.getUrl() + "/parse/classes/GameScore/" + Store.objectId, true);
    this.xhttp.setRequestHeader("X-Parse-Application-Id", "myAppId");
    this.xhttp.setRequestHeader("Content-type", "application/json");
    this.xhttp.send();
  }

  // ...
  var ParseData = {};

  ParseData.postData = function() {
    XHR.setup(function(data){
      Steps.prepareSecondStep(data);
    });
    XHR.POST();
  }

  ParseData.getData = function() {
    XHR.setup(function(data){
      Steps.finishSecondStep(data);
    });
    XHR.GET();
  }

  // boot
  Steps.buildParseUrl();
  Steps.bindPostBtn();
});

