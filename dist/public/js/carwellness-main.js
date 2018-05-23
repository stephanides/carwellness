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
if(document.getElementById("datepicker")){
	$( function() {
	    $( "#datepicker" ).datepicker({
	    	minDate: 0,
	    	altField: "#actualDate",
	    	dateFormat: 'dd-mm-yy'
	    });
	});
}


if(document.getElementById("timepicker")){
	$( function() {
	    $( "#timepicker" ).timepicker({
	    	'timeFormat': 'H:i:s',
	    	 
	    });
	    
         
	});
}


//** Gallery **//
if(document.getElementById("fancybox")){
	$(function(){
	  $(".fancybox").fancybox({
	        'cyclic': true,
	        arrows : true,
	        infobar: true,
	        protect: true,
	        loop: true,
	        animationEffect:"zoom-in-out"
	    });

	    
	    $(".zoom").hover(function(){
			
			$(this).addClass('transition');
		}, function(){
	        
			$(this).removeClass('transition');
		});
	});
}

//** Order part**//

var orderCity = null;
var orderCarType = null;
var orderProgram = [false,false,false,false,false,false,false,false]
var orderDate = new Date();
var orderSum = 0;
var orderName = "";
var orderEmail = ""; 
var orderTel = ""; 
var orderMessage = "";
var ordercarTypeDetail = "";

var orderObjectToSend = {
	city:orderCity,
	fullName:orderName,
	email:claimEmail,
	phone:orderTel,
	message:orderMessage,
	carType:orderCarType,
	carTypeDetail:ordercarTypeDetail,
	date:orderDate.toISOString(),
	program:orderProgram
};

var inaccessibleTimeMorningFrom = "00:00:00";
var inaccessibleTimeMorningTo = "07:00:00";
var inaccessibleTimeEveningFrom = "21:01:00";
var inaccessibleTimeEveningTo = "23:59:00";

timesObjectZilina = [['00:00:00', '07:00:00'],['21:01:00', '23:59:00']];
timesObjectNitra = [['00:00:00', '08:00:00'],['21:01:00', '23:59:00']];

function setTimes(object){
	$("#timepicker").timepicker('option','disableTimeRanges',object);
}




function cityForOrder(e){
	document.getElementById("cityForOrder-2").classList.remove('choosed');
	document.getElementById("cityForOrder-1").classList.remove('choosed');
	document.getElementById("cityForOrder-2").classList.remove('unlisted');
	document.getElementById("cityForOrder-1").classList.remove('unlisted');
	document.getElementById("cityForOrder-"+e).classList.add('choosed');

	if(e == 1){
		document.getElementById("orderChoosedCity").innerHTML = "Autoumyváreň Nitra";
		setTimes(timesObjectNitra);
	}
	if(e == 2){
		document.getElementById("orderChoosedCity").innerHTML = "Autoumyváreň Žilina";
		setTimes(timesObjectZilina);
	}
	orderCity = e;
	document.getElementById("dateContainer").style.pointerEvents = "all";
	document.getElementById("dateDanger").style.display = "none";
	console.log(orderCity);


	var date = $("#datepicker").datepicker('getDate');
	if(date != null){
		var day = date.getDay();
		if(orderCity == 1){
			if(day == 6 || day == 0){
				timesObjectNitra[0] = ['00:00:00', '08:30:00'];
				setTimes(timesObjectNitra);
			}
			else{
				timesObjectNitra[0] = ['00:00:00', '08:00:00'];
				setTimes(timesObjectNitra);
			}
		}
		if(orderCity == 2){
			if(day == 6 || day == 0){
				timesObjectZilina[0] = ['00:00:00', '08:00:00'];
				setTimes(timesObjectZilina);
			}
			else{
				timesObjectZilina[0] = ['00:00:00', '07:00:00'];
				setTimes(timesObjectZilina);
			}
		}
	}
}
function carTypeOrder(e){
	document.getElementById("carTypeOrder-2").classList.remove('choosed');
	document.getElementById("carTypeOrder-1").classList.remove('choosed');
	document.getElementById("carTypeOrder-2").classList.remove('unlisted');
	document.getElementById("carTypeOrder-1").classList.remove('unlisted');
	document.getElementById("carTypeOrder-"+e).classList.add('choosed');
	if(e == 1){
		document.getElementById("orderChoosedCarType").innerHTML = "Auto KLASIK";
	}
	if(e == 2){
		document.getElementById("orderChoosedCarType").innerHTML = "Auto SUV";
	}
	orderCarType = e;
}
function programOrder(e){
	document.getElementById("programOrder-"+0).classList.remove('unlisted');
	if(document.getElementById("programOrder-"+e).classList.contains('choosed')){
		document.getElementById("programOrder-"+e).classList.remove('choosed');
		document.getElementById("orderChoosedProgram-"+e).classList.remove('d-flex');
		
		orderProgram[e] = false;

		switch(e){
			case 0:
				orderSum = orderSum - 28;
				break;
			case 1:
				orderSum = orderSum - 78;
				break;
			case 2:
				orderSum = orderSum - 15;
				break;
			case 3:
				orderSum = orderSum - 18;
				break;
			case 4:
				orderSum = orderSum - 108;
				break;
			case 5:
				orderSum = orderSum - 108;
				break;
			case 6:
				orderSum = orderSum - 78;
				break;
			case 7:
				orderSum = orderSum - 68;
				break;
		}
		document.getElementById("orderSum").innerHTML = orderSum + " €";
	}
	else{
		document.getElementById("programOrder-"+e).classList.add('choosed');
		document.getElementById("orderChoosedProgram-"+e).classList.add('d-flex');
		orderProgram[e] = true;

		switch(e){
			case 0:
				orderSum = orderSum + 28;
				break;
			case 1:
				orderSum = orderSum + 78;
				break;
			case 2:
				orderSum = orderSum + 15;
				break;
			case 3:
				orderSum = orderSum + 18;
				break;
			case 4:
				orderSum = orderSum + 108;
				break;
			case 5:
				orderSum = orderSum + 108;
				break;
			case 6:
				orderSum = orderSum + 78;
				break;
			case 7:
				orderSum = orderSum + 68;
				break;
		}
		document.getElementById("orderSum").innerHTML = orderSum + " €";
	}
	console.log(orderProgram);

}

function removeProgram(e){
	document.getElementById("programOrder-"+e).classList.remove('choosed');
	document.getElementById("orderChoosedProgram-"+e).classList.remove('d-flex');
	switch(e){
			case 0:
				orderSum = orderSum - 28;
				break;
			case 1:
				orderSum = orderSum - 78;
				break;
			case 2:
				orderSum = orderSum - 15;
				break;
			case 3:
				orderSum = orderSum - 18;
				break;
			case 4:
				orderSum = orderSum - 108;
				break;
			case 5:
				orderSum = orderSum - 108;
				break;
			case 6:
				orderSum = orderSum - 78;
				break;
			case 7:
				orderSum = orderSum - 68;
				break;
		}
		document.getElementById("orderSum").innerHTML = orderSum + " €";
		
		orderProgram[e] = false;
}
function orderNameResult(){
	document.getElementById("orderNameResult").innerHTML = document.getElementById("orderName").value;
	orderName = document.getElementById("orderName").value;
	document.getElementById("orderName").classList.remove('unlisted');
}
function orderEmailResult(){
	document.getElementById("orderEmailResult").innerHTML = document.getElementById("orderEmail").value;
	orderEmail = document.getElementById("orderEmail").value;
	document.getElementById("orderEmail").classList.remove('unlisted');
}
function orderTelResult(){
	document.getElementById("orderTelResult").innerHTML = document.getElementById("orderTel").value;
	orderTel = document.getElementById("orderTel").value;
	document.getElementById("orderTel").classList.remove('unlisted');
}
function orderCarTypeResult(){
	document.getElementById("orderCarTypeResult").innerHTML = document.getElementById("orderCarType").value;
	ordercarTypeDetail = document.getElementById("orderCarType").value;
	document.getElementById("orderCarType").classList.remove('unlisted');
}
function orderDateResult(){
	console.log(orderCity);
	document.getElementById("orderDateResult").innerHTML = document.getElementById("datepicker").value;
	var date = $("#datepicker").datepicker('getDate');
	var day = date.getDay();
	if(orderCity == 1){
		if(day == 6 || day == 0){
			timesObjectNitra[0] = ['00:00:00', '08:30:00'];
			setTimes(timesObjectNitra);
		}
		else{
			timesObjectNitra[0] = ['00:00:00', '08:00:00'];
			setTimes(timesObjectNitra);
		}
	}
	if(orderCity == 2){
		if(day == 6 || day == 0){
			timesObjectZilina[0] = ['00:00:00', '08:00:00'];
			setTimes(timesObjectZilina);
		}
		else{
			timesObjectZilina[0] = ['00:00:00', '07:00:00'];
			setTimes(timesObjectZilina);
		}
	}


}
function orderTimeResult(){
	console.log(document.getElementById("timepicker").value)
	document.getElementById("orderTimeResult").innerHTML = document.getElementById("timepicker").value;
}

function isProgram(element) {
    return (element === true);
}

function sendOrder(){
	var readyToSend = false;
	var date = document.getElementById("datepicker").value;
	var time = document.getElementById("timepicker").value;
	orderDate = date.split('-')[2]+'-'+date.split('-')[1]+'-'+date.split('-')[0]+'T'+time+'.00Z'
	orderMessage = document.getElementById("orderMessage").value;

	orderObjectToSend.city = orderCity;
	orderObjectToSend.fullName = orderName;
	orderObjectToSend.email = orderEmail;
	orderObjectToSend.phone = orderTel;
	orderObjectToSend.message = orderMessage;
	orderObjectToSend.carType = orderCarType;
	orderObjectToSend.date = orderDate;
	orderObjectToSend.program = orderProgram;



	if(orderCity == null){
		readyToSend = false;
		document.getElementById("cityForOrder-2").classList.add('unlisted');
	    document.getElementById("cityForOrder-1").classList.add('unlisted');
	}
	if(orderCarType == null){
		readyToSend = false;
		document.getElementById("carTypeOrder-2").classList.add('unlisted');
	    document.getElementById("carTypeOrder-1").classList.add('unlisted');
	}

	if(!orderProgram.some(isProgram)){
		console.log("nebol vybraty ziaden program");
		document.getElementById("programOrder-"+0).classList.add('unlisted');
	}
	if(orderName == ""){
		readyToSend = false;
		document.getElementById("orderName").classList.add('unlisted');
	}
	if(orderEmail == ""){
		readyToSend = false;
		document.getElementById("orderEmail").classList.add('unlisted');
	}
	if(orderTel == ""){
		readyToSend = false;
		document.getElementById("orderTel").classList.add('unlisted');
	}
	if(ordercarTypeDetail == ""){
		readyToSend = false;
		document.getElementById("orderCarType").classList.add('unlisted');
	}

	if(readyToSend){
		$.ajax({
		  type: "POST",
		  url: "http://localhost:4040/order/order-create",
		  data: orderObjectToSend, //JSON.stringify(orderObjectToSend)
		  dataType: "json",
		  success:  function (response) {
		  		console.log(response);
	            if(response.status === "success") {
	                console.log(response);
	            } else if(response.status === "error") {
	                console.log(response);
	            }
	        },
		   error: function(err) {
		   	console.log(err);
		   }
	    });
	}
}

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
	claimMessage = document.getElementById("claimMessage").value;
	
	claimObjectToSend.city = claimCity;
	claimObjectToSend.fullName = claimName;
	claimObjectToSend.email = claimEmail;
	claimObjectToSend.phone = claimTel;
	claimObjectToSend.image = claimImage;
	claimObjectToSend.message = claimMessage;



	$.ajax({
	  type: "POST",
	  url: "http://localhost:4040/claim/claim-create",
	  data: claimObjectToSend,
	  dataType: "json",
	  success:  function (response) {
	  		console.log(response);
            if(response.status === "success") {
                console.log(response);
            } else if(response.status === "error") {
                console.log(response);
            }
        },
	   error: function(err) {
	   	console.log(err);
	   }
    });
}

function imgtobase(){
	var file  = document.querySelector('input[type=file]').files[0];
	var reader = new FileReader();
	var base64 = "";
	reader.addEventListener("load", function () {
    	claimImage = reader.result;
  	}, false);
	if(file){
		reader.readAsDataURL(file);
	}
}