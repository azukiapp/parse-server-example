$(document).ready(function(){

  // Deals with Steps UI
  var Steps = {};

  Steps.getUrl = function() {
    var port = window.location.port;
    var url = window.location.hostname;
    if (port) url = url + ':' + port;
    $('#parse-url').html('http://' + url + '/parse');
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
    Store.objectId = data.objectId;
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

  // ...
  var ParseData = {};

  ParseData.postData = function() {
    // we will leave the interaction with Parse server
    // for the backend, behind a route
    $.getJSON("http://parse-server.dev.azk.io/post", function(data) {
      Steps.prepareSecondStep(data);
    });
  }

  ParseData.getData = function() {
    // we will leave the interaction with Parse server
    // for the backend, behind a route
    $.getJSON("http://parse-server.dev.azk.io/get/" + Store.objectId, function(data) {
      Steps.finishSecondStep(data);
    });
  }

  // boot
  Steps.getUrl();
  Steps.bindPostBtn();
});
