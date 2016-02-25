$(document).ready(function(){

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
    var url = "http://parse-server.dev.azk.io/post";
    if (appId) url = url + '/' + serverIp + '/' + appId;
    $.getJSON(url, function(data) {
      $('#prod-test-btn').addClass('success').html("✓  POSTED");
      $('#step-3').delay(500).slideDown().removeClass('step--disabled');
    });
  }

  // boot
  DeploySteps.bindPostBtn();
});
