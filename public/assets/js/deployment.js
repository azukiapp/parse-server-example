$(document).ready(function(){

  // Deals with Steps UI
  var DeploySteps = {};

  DeploySteps.bindPostBtn = function() {
    $('#prod-test-btn').click(function(e){
      var serverIp = $("#prod-server-ip").val();
      var appId = $("#prod-app-id").val();
      console.log('-> ', serverIp, appId);
      ParseProdRequest.postData(serverIp, appId);
      e.preventDefault();
    });
  }

  var ParseProdRequest = {};

  ParseProdRequest.postData = function(serverIp, appId) {
    XHR.setup(function(data){
    $('#prod-test-btn').addClass('success').html("✓  CONGRATS! PARSE SERVER IS WORKING. :-)");
    $('#step-3').delay(500).slideDown().removeClass('step--disabled');
      // $('#step-3').delay(500).slideDown().removeClass('step--disabled');
    });
    XHR.POST();
  }

  // boot
  DeploySteps.bindPostBtn();
  $('#prod-server-ip').val( window.location.hostname );
});
