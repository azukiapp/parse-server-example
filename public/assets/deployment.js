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
    // we will leave the interaction with Parse server
    // for the backend, behind a route
    var url = Config.getUrl() + '/post';
    serverIp = window.location.hostname;
    if (appId) url = url + '/' + serverIp + '/' + appId;
    $.getJSON(url, function(data) {
      $('#prod-test-btn').addClass('success').html("✓  POSTED");
      $('#step-3').delay(500).slideDown().removeClass('step--disabled');
    });
  }

  // boot
  DeploySteps.bindPostBtn();
  $('#prod-server-ip').val( window.location.hostname );
});
