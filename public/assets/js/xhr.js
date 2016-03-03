var XHR = {}
XHR.setup = function(callback) {
  this.xhttp = new XMLHttpRequest();
  var _self = this;
  this.xhttp.onreadystatechange = function() {
    if (_self.xhttp.readyState == 4 && _self.xhttp.status >= 200 && _self.xhttp.status <= 299) {
      callback(_self.xhttp.responseText);
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
