$(document).ready(function(){

  // Deals with Steps UI
  var Steps = {};

  Steps.buildParseUrl = function() {
    var url = Config.getUrl();
    $('#parse-url').html(url + '/parse');
  }

  Steps.bindPostBtn = function() {
    $('#post-btn').click(function(e){
      ParseRequest.postData();
      e.preventDefault();
    });
  }

  Steps.enableGetButton = function() {
    $('#step-2').removeClass('step--disabled');
  }

  Steps.bindGetBtn = function() {
    $('#get-btn').click(function(e){
      ParseRequest.getData();
      e.preventDefault();
    });
  }

  Steps.prepareSecondStep = function(data) {
    $('#step-1').addClass('step--disabled');
    $('#post-btn').addClass('success').html("✓  POSTED");
    $('#post-pre').html('Output: ' + data).slideDown();
    console.log("DATA:", data);
    Store.objectId = JSON.parse(data).objectId;
    console.log('Boject', Store.objectId);
    this.enableGetButton();
    this.bindGetBtn();
  }

  Steps.finishSecondStep = function(data) {
    $('#get-btn').addClass('success').html('✓  Fetched');
    $('#get-pre').html('Output: ' + data).slideDown();
    this.showWorkingMessage();
  }

  Steps.showWorkingMessage = function() {
    $('#step-2').addClass('step--disabled');
    $('#step-3').delay(500).slideDown().removeClass('step--disabled');
  }

  // ...
  var ParseRequest = {};

  ParseRequest.postData = function() {
    XHR.setup(function(data){
      Steps.prepareSecondStep(data);
    });
    XHR.POST();
  }

  ParseRequest.getData = function() {
    XHR.setup(function(data){
      Steps.finishSecondStep(data);
    });
    XHR.GET();
  }

  // boot
  Steps.buildParseUrl();
  Steps.bindPostBtn();
});

