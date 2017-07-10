var id = null;
var firstTime = -1;
var currentCache = 0;

//Target Locations
var loc1 = {lat: 43.7736521, lon: -79.5048982, desc: "Lassonde"};
var loc2 = {lat: 43.7724036, lon: -79.5029066, desc: "YorkU Commons Pond"};
var loc3 = {lat: 43.7714247, lon: -79.5005375, desc: "Accolade East"};
var loc4 = {lat: 43.7725488, lon: -79.5064078, desc: "Bergeron"};

var caches = new Array();
  caches[0] = loc1;
  caches[1] = loc2;
  caches[2] = loc3;
  caches[3] = loc4;

function togglegps() {
    var button = document.getElementById("togglegps");
    if (navigator.geolocation) {
        if (id === null) {
            id = navigator.geolocation.watchPosition(showPosition, handleError, {enableHighAccuracy : true, timeout: 1000});
            button.innerHTML = "STOP GPS";
            firstTime = -1;
        } else {
            navigator.geolocation.clearWatch(id);
            id = null;
            button.innerHTML = "START GPS";
        }
    } else {
        alert("NO GPS AVAILABLE");
    }
}
//Error messages
function handleError(error) {
  var errorstr = "Really unknown error";
    switch (error.code) {
    case error.PERMISSION_DENIED:
        errorstr = "Permission deined";
        break;
    case error.POSITION_UNAVAILABLE:
        errorstr = "Permission unavailable";
        break;
    case error.TIMEOUT:
        errorstr = "Timeout";
        break;
    case error.UNKNOWN_ERROR:
        error = "Unknown error";
        break;
    }
    alert("GPS error " + error);
}

//Current location
function showPosition(position) {
    var latitude = document.getElementById("latitude");
    var longitude = document.getElementById("longitude");
    var now = document.getElementById("now");

    latitude.innerHTML = position.coords.latitude;
    longitude.innerHTML = position.coords.longitude;
    if (firstTime < 0) {
      firstTime = position.timestamp;
    }
    now.innerHTML = position.timestamp - firstTime;

    var u = interpolate(201, 584, -79.508355, -79.501057, position.coords.longitude); //longitude configuration
    var v = interpolate(304, 302, 43.772824, 43.774311, position.coords.latitude); //latitdude configuration

    //Map boundry for width
    if (u < 0) {
      u = 0;
    } else if (u > 710) {
      u = 710;
    }

    //Map boundry for height
    if (v < 0) {
      v = 0;
    } else if (v > 470) {
      v = 470;
    }

    //Me image relocation on map
    var debug = document.getElementById("debug");
    debug.innerHTML = "(" + u + ", " + v + ")";
    var me = document.getElementById("me");
    me.style.left = u - (me.offsetWidth / 2);
    me.style.top = v - (me.offsetHeight / 2);
}

//Configuration on the coordinates to pixels
function interpolate(u1, u2, gps1, gps2, gps) {
  var interpolate = u1 + (u2 - u1) * (gps - gps1) / (gps2 - gps1);
  return interpolate;
}

//Updates to the next Geolocation
function updateCache() {
  if (currentCache > caches.length) {
     currentCache = 0;
  }
  currentCache++;
  showCache();
}

//Target image on the map
function showCache() {
  var target = document.getElementById("target");
  var x = interpolate(209, 513, -79.5064078, -79.5005405, caches[currentCache].lon); //LONGITUDE LOCATION
  var y = interpolate(295, 183, 43.7725488, 43.7757161, caches[currentCache].lat); //LATITUDE LOCATION
  target.style.left = x - (target.offsetWidth / 2);
  target.style.top = y - (target.offsetHeight / 2);

  var description = document.getElementById("tarloc");
  description.innerHTML = "Geocache location: " + caches[currentCache].desc;

}
