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
  var DeploySteps = {};

  DeploySteps.bindPostBtn = function() {
    $('#prod-test-btn').click(function(e){
      var serverIp = $("#prod-server-ip").val();
      var appId = $("#prod-app-id").val();
      console.log('-> ', serverIp, appId);
      ParseProdData.postData(serverIp, appId);
      e.preventDefault();
    });
  }

  var ParseProdData = {};

  ParseProdData.postData = function(serverIp, appId) {
    XHR.setup(function(data){
    $('#prod-test-btn').addClass('success').html("✓  CONGRATS! PARSE SERVER IS WORKING. :-)");
      // $('#step-3').delay(500).slideDown().removeClass('step--disabled');
    });
    XHR.POST();
  }

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

  // boot
  DeploySteps.bindPostBtn();
  $('#prod-server-ip').val( window.location.hostname );
});
