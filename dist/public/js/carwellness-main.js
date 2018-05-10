function mapZilina() {
	console.log("mapa");
    var mapOptions = {
    	zoom: 14,
        center: new google.maps.LatLng(49.220597, 18.740918),
        mapTypeId: google.maps.MapTypeId.HYBRID
    }
    loadJSON(function(response) {
      loaded_json = JSON.parse(response);
      styledMapType = new google.maps.StyledMapType(loaded_json, {name: 'Map'});

      map.mapTypes.set('styled_map', styledMapType);
      map.setMapTypeId('styled_map');
    });


     function loadJSON(callback) {
      var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
      xobj.open('GET', window.location.origin + '/assets/js/map.json', true);
      xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200")
          callback(xobj.responseText);
      };
      xobj.send(null);
    }
var map = new google.maps.Map(document.getElementById("mapZilina"), mapOptions);

var marker = new google.maps.Marker({
          position: new google.maps.LatLng(49.220597, 18.740918),
          map: map,
          title: 'CarWellness Žilina',
          fullscreenControl: false
});
}
function mapNitra() {
	console.log("mapa");
    var mapOptions = {
        center: new google.maps.LatLng(48.306872, 18.087049),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.HYBRID
    }
    loadJSON(function(response) {
      loaded_json = JSON.parse(response);
      styledMapType = new google.maps.StyledMapType(loaded_json, {name: 'Map'});

      map.mapTypes.set('styled_map', styledMapType);
      map.setMapTypeId('styled_map');
    });

     function loadJSON(callback) {
      var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
      xobj.open('GET', window.location.origin + '/assets/js/map.json', true);
      xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200")
          callback(xobj.responseText);
      };
      xobj.send(null);
    }
var map = new google.maps.Map(document.getElementById("mapNitra"), mapOptions);
var marker = new google.maps.Marker({
          position: new google.maps.LatLng(48.306872, 18.087049),
          map: map,
          title: 'CarWellness Nitra',
          fullscreenControl: false
});
}

