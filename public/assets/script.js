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
      $('#result').append('Posting data...');
      ParseData.postData();
      e.preventDefault();
    });
  }

  Steps.enableGetButton = function() {
    $('#get-btn').removeClass('step-btn--disabled');
    $('#get-button')
      .removeClass('step-btn-disabled')
      .addClass('step-btn--active')
  }

  Steps.bindGetBtn = function() {
    $('#get-btn').click(function(e){
      $('#result').append('Fetching posted data...');
      ParseData.getData();
      e.preventDefault();
    });
  }

  Steps.showWorkingMessage = function() {
    $('#local-parse-working').delay(1000).fadeIn();
  }

  // Cache re-usable data
  var Store = {
    objectId: ""
  };

  // ...
  var ParseData = {};

  ParseData.postData = function() {
    $.getJSON("http://parse-server.dev.azk.io/post", function(data) {
      // $('#post-pre').append('...Done!');
      $('#post-btn').addClass('step-btn--active');
      $('#post-pre').html(JSON.stringify(data)).fadeIn();
      Store.objectId = data.objectId;
      Steps.enableGetButton();
      Steps.bindGetBtn();
    });
  }

  ParseData.getData = function() {
    $.getJSON("http://parse-server.dev.azk.io/get/" + Store.objectId, function(data) {
      $('#get-btn').addClass('step-btn--active');
      $('#get-pre').html(JSON.stringify(data)).fadeIn();
      Steps.showWorkingMessage();
    });
  }

  // boot
  Steps.getUrl();
  Steps.bindPostBtn();
});
