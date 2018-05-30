'use strict';
/*
* Globals
*/
var _baseURI = location.protocol+'//'+location.host;

//**Map functions**//

function mapZilina() {
	console.log('mapa');
    var mapOptions = {
    	zoom: 14,
        center: new google.maps.LatLng(49.220597, 18.740918),
        mapTypeId: google.maps.MapTypeId.HYBRID
    };
    loadJSON(function(response) {
       var loaded_json = JSON.parse(response);
       var styledMapType = new google.maps.StyledMapType(loaded_json, {name: 'Map'});

      map.mapTypes.set('styled_map', styledMapType);
      map.setMapTypeId('styled_map');
    });


     function loadJSON(callback) {
      var xobj = new XMLHttpRequest();
      xobj.overrideMimeType('application/json');
      xobj.open('GET', window.location.origin + '/assets/js/map.json', true);
      xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == '200')
          callback(xobj.responseText);
      };
      xobj.send(null);
    }
	var map = new google.maps.Map(document.getElementById('mapZilina'), mapOptions);

	var marker = new google.maps.Marker({
	          position: new google.maps.LatLng(49.220597, 18.740918),
	          map: map,
	          title: 'CarWellness Žilina',
	          fullscreenControl: false
	});
}
function mapNitra() {
	console.log('mapa');
    var mapOptions = {
        center: new google.maps.LatLng(48.306872, 18.087049),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };
    loadJSON(function(response) {
      var loaded_json = JSON.parse(response);
      var styledMapType = new google.maps.StyledMapType(loaded_json, {name: 'Map'});

      map.mapTypes.set('styled_map', styledMapType);
      map.setMapTypeId('styled_map');
    });

     function loadJSON(callback) {
      var xobj = new XMLHttpRequest();
      xobj.overrideMimeType('application/json');
      xobj.open('GET', window.location.origin + '/assets/js/map.json', true);
      xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == '200')
          callback(xobj.responseText);
      };
      xobj.send(null);
    }
	var map = new google.maps.Map(document.getElementById('mapNitra'), mapOptions);
	var marker = new google.maps.Marker({
	          position: new google.maps.LatLng(48.306872, 18.087049),
	          map: map,
	          title: 'CarWellness Nitra',
	          fullscreenControl: false
	});
}

//**Date and Time pickers**//
if(document.getElementById('datepicker')){
	$( function() {
	    $( '#datepicker' ).datepicker({
	    	minDate: 0,
	    	altField: '#actualDate',
	    	dateFormat: 'dd-mm-yy'
	    });
	});
}


if(document.getElementById('timepicker')){
	$( function() {
	    $( '#timepicker' ).timepicker({
	    	'timeFormat': 'H:i:s',
	    	 
	    });
	    
         
	});
}

//** Gallery **//
if(document.getElementById('fancybox')){
	$(function(){
	  $('.fancybox').fancybox({
	        'cyclic': true,
	        arrows : true,
	        infobar: true,
	        protect: true,
	        loop: true,
	        animationEffect:'zoom-in-out'
	    });

	    
	    $('.zoom').hover(function(){
			
			$(this).addClass('transition');
		}, function(){
	        
			$(this).removeClass('transition');
		});
	});
}

//** Order part**//
var orderCity = null;
var orderCarType = null;
var orderProgram = [false,false,false,false,false,false,false,false];
var orderDate = new Date();
var orderSum = 0;
var orderName = '';
var orderEmail = ''; 
var orderTel = ''; 
var orderMessage = '';
var ordercarTypeDetail = '';

//Web Socket
var socket = null;
if(typeof io === 'function')
  socket = io();

var orderObjectToSend = {
	city:orderCity,
	fullName:orderName,
	email:orderEmail,
	phone:orderTel,
	message:orderMessage,
	carType:orderCarType,
	carTypeDetail:ordercarTypeDetail,
	date:orderDate.toISOString(),
	program:orderProgram
};

var inaccessibleTimeMorningFrom = '00:00:00';
var inaccessibleTimeMorningTo = '07:00:00';
var inaccessibleTimeEveningFrom = '21:01:00';
var inaccessibleTimeEveningTo = '23:59:00';

var timesObjectZilina = [['00:00:00', '07:00:00'],['21:01:00', '23:59:00']];
var timesObjectNitra = [['00:00:00', '08:00:00'],['21:01:00', '23:59:00']];

function setTimes(object){
  $('#timepicker').timepicker('option','disableTimeRanges',object);
}

function cityForOrder(e){
	document.getElementById('cityForOrder-2').classList.remove('choosed');
	document.getElementById('cityForOrder-1').classList.remove('choosed');
	document.getElementById('cityForOrder-2').classList.remove('unlisted');
	document.getElementById('cityForOrder-1').classList.remove('unlisted');
	document.getElementById('cityForOrder-'+e).classList.add('choosed');

	if(e == 1){
		document.getElementById('orderChoosedCity').innerHTML = 'Autoumyváreň Nitra';
		setTimes(timesObjectNitra);
	}
	if(e == 2){
		document.getElementById('orderChoosedCity').innerHTML = 'Autoumyváreň Žilina';
		setTimes(timesObjectZilina);
	}
	orderCity = e;
	document.getElementById('dateContainer').style.pointerEvents = 'all';
	document.getElementById('dateDanger').style.display = 'none';
	console.log(orderCity);


	var date = $('#datepicker').datepicker('getDate');
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
	document.getElementById('carTypeOrder-2').classList.remove('choosed');
	document.getElementById('carTypeOrder-1').classList.remove('choosed');
	document.getElementById('carTypeOrder-2').classList.remove('unlisted');
	document.getElementById('carTypeOrder-1').classList.remove('unlisted');
	document.getElementById('carTypeOrder-'+e).classList.add('choosed');
	if(e == 1){
		document.getElementById('orderChoosedCarType').innerHTML = 'Auto KLASIK';
	}
	if(e == 2){
		document.getElementById('orderChoosedCarType').innerHTML = 'Auto SUV';
	}
	orderCarType = e;
}

function programOrder(e){
	document.getElementById('programOrder-'+0).classList.remove('unlisted');
	if(document.getElementById('programOrder-'+e).classList.contains('choosed')){
		document.getElementById('programOrder-'+e).classList.remove('choosed');
		document.getElementById('orderChoosedProgram-'+e).classList.remove('d-flex');
		
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
		document.getElementById('orderSum').innerHTML = orderSum + ' €';
	}
	else{
		document.getElementById('programOrder-'+e).classList.add('choosed');
		document.getElementById('orderChoosedProgram-'+e).classList.add('d-flex');
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
		document.getElementById('orderSum').innerHTML = orderSum + ' €';
	}
	console.log(orderProgram);
}

function removeProgram(e){
	document.getElementById('programOrder-'+e).classList.remove('choosed');
	document.getElementById('orderChoosedProgram-'+e).classList.remove('d-flex');
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
		document.getElementById('orderSum').innerHTML = orderSum + ' €';
		
		orderProgram[e] = false;
}

function orderNameResult(){
	document.getElementById('orderNameResult').innerHTML = document.getElementById('orderName').value;
	orderName = document.getElementById('orderName').value;
	document.getElementById('orderName').classList.remove('unlisted');
}

function orderEmailResult(){
	document.getElementById('orderEmailResult').innerHTML = document.getElementById('orderEmail').value;
	orderEmail = document.getElementById('orderEmail').value;
	document.getElementById('orderEmail').classList.remove('unlisted');
}

function orderTelResult(){
	document.getElementById('orderTelResult').innerHTML = document.getElementById('orderTel').value;
	orderTel = document.getElementById('orderTel').value;
	document.getElementById('orderTel').classList.remove('unlisted');
}

function orderCarTypeResult(){
	document.getElementById('orderCarTypeResult').innerHTML = document.getElementById('orderCarType').value;
	ordercarTypeDetail = document.getElementById('orderCarType').value;
	document.getElementById('orderCarType').classList.remove('unlisted');
}

var timeObject = [['00:00:00', '00:30:00'], ['00:30:00', '01:00:00'], ['01:00:00', '01:30:00'], ['01:30:00', '02:00:00'], ['02:00:00', '02:30:00'], ['02:30:00', '03:00:00'], ['03:00:00', '03:30:00'], ['03:30:00', '04:00:00'], ['04:00:00', '04:30:00'], ['04:30:00', '05:00:00'], ['05:00:00', '05:30:00'], ['05:30:00', '06:00:00'], ['06:00:00', '06:30:00'], ['06:30:00', '07:00:00'], ['07:00:00', '07:30:00'], ['07:30:00', '08:00:00'], ['08:00:00', '08:30:00'], ['08:30:00', '09:00:00'], ['09:00:00', '09:30:00'], ['09:30:00', '10:00:00'], ['10:00:00','10:30:00'], ['10:30:00', '11:00:00'], ['11:00:00', '11:30:00'], ['11:30:00', '12:00:00'], ['12:00:00', '12:30:00'], ['12:30:00', '13:00:00'], ['13:00:00', '13:30:00'], ['13:30:00', '14:00:00'], ['14:00:00', '14:30:00'], ['14:30:00','15:00:00'], ['15:00:00', '15:30:00'], ['15:30:00', '16:00:00'], ['16:00:00', '16:30:00'], ['16:30:00', '17:00:00'], ['17:00:00', '17:30:00'], ['17:30:00', '18:00:00'], ['18:00:00', '18:30:00'], ['18:30:00', '19:00:00'], ['19:00:00', '19:30:00'], ['19:30:00', '20:00:00'], ['20:00:00', '20:30:00'], ['20:30:00', '21:00:00'], ['21:00:00', '21:30:00'], ['21:30:00', '22:00:00'], ['22:00:00', '22:30:00'], ['22:30:00', '23:00:00'], ['23:00:00', '23:30:00']]

function fillObjectsOfTimes(){

}

function orderDateResult(){

  

	var avDate = document.getElementById('datepicker').value;
	var avDateISO = avDate.split('-')[2]+'-'+avDate.split('-')[1]+'-'+avDate.split('-')[0]+'T00:00:00.00Z';

	

	$.ajax({
		  type: 'GET',
		  url: _baseURI+'/availability/availability/' + avDateISO + '/' + orderCity,
		  success:  function (response) {
				 for(var i = 0; i<response.data.length;i++){
					 if(orderCity == 1){
						timesObjectNitra.push(timeObject[response.data[i].arrN]);
						setTimes(timesObjectNitra);
					 }
					 else if(orderCity == 2){
						timesObjectZilina.push(timeObject[response.data[i].arrN]);
						setTimes(timesObjectZilina);
					 }
				 }
	            if(response.status === 'success') {
	                
	            } else if(response.status === 404) {
	                console.log('nenaslo sa nic');
	            }
	        },
		   error: function(err) {
		   	if(err.status === 404) {
	            return;
	        }
		   }
	    });

	console.log(orderCity);
	document.getElementById('orderDateResult').innerHTML = document.getElementById('datepicker').value;
	var date = $('#datepicker').datepicker('getDate');
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
	console.log(document.getElementById('timepicker').value);
	document.getElementById('orderTimeResult').innerHTML = document.getElementById('timepicker').value;
}

function isProgram(element) {
    return (element === true);
}

function sendOrder(){
	var readyToSend = true;
	var date = document.getElementById('datepicker').value;
	var time = document.getElementById('timepicker').value;
	orderDate = date.split('-')[2]+'-'+date.split('-')[1]+'-'+date.split('-')[0]+'T'+time+'.00Z';
	orderMessage = document.getElementById('orderMessage').value;

	orderObjectToSend.city = orderCity;
	orderObjectToSend.fullName = orderName;
	orderObjectToSend.email = orderEmail;
	orderObjectToSend.phone = orderTel;
	orderObjectToSend.message = orderMessage;
	orderObjectToSend.carType = orderCarType;
	orderObjectToSend.carTypeDetail = ordercarTypeDetail;
	orderObjectToSend.date = orderDate;
	orderObjectToSend.program = orderProgram;

	if(orderCity == null){
		readyToSend = false;
		document.getElementById('cityForOrder-2').classList.add('unlisted');
			document.getElementById('cityForOrder-1').classList.add('unlisted');
			$('html, body').animate({scrollTop:$('#cityForOrder-1').offset().top - 140 + "px"}, 'slow');
	}
	if(orderCarType == null){
		readyToSend = false;
		document.getElementById('carTypeOrder-2').classList.add('unlisted');
			document.getElementById('carTypeOrder-1').classList.add('unlisted');
			$('html, body').animate({scrollTop:$('#cityForOrder-1').offset().top - 140 + "px"}, 'slow');
	}

	if(!orderProgram.some(isProgram)){
		console.log('nebol vybraty ziaden program');
		document.getElementById('programOrder-'+0).classList.add('unlisted');
		$('html, body').animate({scrollTop:$('#cityForOrder-1').offset().top - 140 + "px"}, 'slow');
	}
	if(orderName == ''){
		readyToSend = false;
		document.getElementById('orderName').classList.add('unlisted');
	}
	if(orderEmail == ''){
		readyToSend = false;
		document.getElementById('orderEmail').classList.add('unlisted');
	}
	if(orderTel == ''){
		readyToSend = false;
		document.getElementById('orderTel').classList.add('unlisted');
	}
	if(ordercarTypeDetail == ''){
		readyToSend = false;
		document.getElementById('orderCarType').classList.add('unlisted');
	}

	console.log(readyToSend);

	if(readyToSend){
		console.log(orderObjectToSend);
		$.ajax({
		  type: 'POST',
		  url: _baseURI+'/order/order-create',
		  data: orderObjectToSend, //JSON.stringify(orderObjectToSend)
		  dataType: 'json',
		  success:  function (response) {
	  		console.log(response);
	  		if(response.success) {
          //SERVICE WORKER CALL
          if(socket) {
            console.log('GOING EMIT SOCKET');
						socket.emit('order created');
						$('#orderModal').modal('show');
          }
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
var claimName = '';
var claimEmail = '';
var claimTel = '';
var claimImage = '';
var claimMessage = '';
var claimObjectToSend = {
	city:claimCity,
	fullName:claimName,
	email:claimEmail,
	phone:claimTel,
	image:claimImage,
	message:claimMessage
};
var claimReady = false;

function cityForClaim(e){
	document.getElementById('city-1').classList.remove('choosed');
	document.getElementById('city-2').classList.remove('choosed');
	document.getElementById('city-1').classList.remove('unlisted');
	document.getElementById('city-2').classList.remove('unlisted');
	document.getElementById('city-'+e).classList.add('choosed');

	claimCity = e;
	claimReady = true;
}


function sendClaim(){
	claimName = document.getElementById('claimName').value;
	claimEmail = document.getElementById('claimEmail').value;
	claimTel = document.getElementById('claimTel').value;
	claimMessage = document.getElementById('claimMessage').value;
	
	claimObjectToSend.city = claimCity;
	claimObjectToSend.fullName = claimName;
	claimObjectToSend.email = claimEmail;
	claimObjectToSend.phone = claimTel;
	claimObjectToSend.image = claimImage;
	claimObjectToSend.message = claimMessage;

	if(claimCity == null){
		claimReady = false;
		document.getElementById('city-1').classList.add('unlisted');
	    document.getElementById('city-2').classList.add('unlisted');
	}
	if(!document.getElementById('claimName').checkValidity()){
		claimReady = false;
	}
	if(!document.getElementById('claimEmail').checkValidity()){
		claimReady = false;
	}
	if(!($('#claimCheckBox').is(':checked'))){
    claimReady = false;
	}
	else if(($('#claimCheckBox').is(':checked'))){
	
    claimReady = true;
	}

	if(claimReady) {
    $.ajax({
			type: 'POST',
			url: _baseURI+'/claim/claim-create',
			data: claimObjectToSend,
			dataType: 'json',
			success:  function (response) {
				console.log(response);
				//SERVICE WORKER CALL
				if(socket) {
					console.log('GOING EMIT SOCKET');
					socket.emit('claim created');
					
					$('#claimModal').modal('show');
				}
			},
			error: function(err) {
				 console.log(err);
			}
		});
	}
}

/*
* Fn. executed on contact form submit
*/
function sendContact(form) {
  event.preventDefault();
  var data = {};
  var err = false;

  //Iterate over all input elements in form and interpolate it's values to data object based on input id
  for(var i = 0; i < form.querySelectorAll('input').length; i++) {
    if(form.querySelectorAll('input')[i].value)
      data[form.querySelectorAll('input')[i].id] = form.querySelectorAll('input')[i].value;
    else if(form.querySelectorAll('input')[i].id != "tel"){
      //TODO: Stefan handle warnings/errors at empty input values on front-end
      console.log(form.querySelectorAll('input')[i].id+' is empty');
      err = true;
    }
  }

  //interpolate 'textarea' value to data object with key based on textarea id
  if(form.querySelector('textarea').value)
    data[form.querySelector('textarea').id] = form.querySelector('textarea').value;
  else {
    //TODO: Stefan handle warning/error at empty textarea value on front-end
    console.log(form.querySelector('textarea').id+' is empty');
  }

  if(!err) {
    console.log(data);
    
    $.ajax({
      type: 'POST',
      url: _baseURI+'/email/send',
      data: data,
      dataType: 'json',
      success:  function (response) {
				console.log(response);
				$('#contactModal').modal('show');
      },
      error: function(err) {
        console.log(err);
      }
    });
  }
  else console.log('Can\'t send e-mail');
}

function imgtobase(){
	var file  = document.querySelector('input[type=file]').files[0];
	var reader = new FileReader();
	var base64 = '';

	reader.addEventListener('load', function () {
    claimImage = reader.result;
  }, false);
	
	if(file)
	  reader.readAsDataURL(file);
}