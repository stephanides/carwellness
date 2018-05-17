//**Map functions**//

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

//**Date and Time pickers**//

$( function() {
    $( "#datepicker" ).datepicker({
    	minDate: 0,
    	altField: "#actualDate"
    });
});
$( function() {
    $( "#timepicker" ).timepicker({
    	'timeFormat': 'H:i:s'
    });
});

//** Gallery **//

$(document).ready(function(){
  $(".fancybox").fancybox({
        openEffect: "none",
        closeEffect: "none"
    });
    
    $(".zoom").hover(function(){
		
		$(this).addClass('transition');
	}, function(){
        
		$(this).removeClass('transition');
	});
});
    

//** Claim part - creating of JSon for Server**//

var claimCity = null;
var claimName = "";
var claimEmail = "";
var claimTel = "";
var claimImage = "";
var claimMessage = "";
var claimObjectToSend = {
	city:claimCity,
	fullName:claimName,
	email:claimEmail,
	phone:claimTel,
	image:claimImage,
	message:claimMessage
};

function cityForClaim(e){
	document.getElementById("city-1").classList.remove('choosed');
	document.getElementById("city-2").classList.remove('choosed');
	document.getElementById("city-"+e).classList.add('choosed');

	claimCity = e;
}
function sendClaim(){
	claimName = document.getElementById("claimName").value;
	claimEmail = document.getElementById("claimEmail").value;
	claimTel = document.getElementById("claimTel").value;
	claimImage = document.getElementById("claimImage").value;
	claimMessage = document.getElementById("claimMessage").value;
	
	claimObjectToSend.city = claimCity;
	claimObjectToSend.fullName = claimName;
	claimObjectToSend.email = claimEmail;
	claimObjectToSend.phone = claimTel;
	claimObjectToSend.image = claimImage;
	claimObjectToSend.message = claimMessage;

	console.log(claimObjectToSend);
}