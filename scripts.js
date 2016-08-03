var canvas1; //this is the canvas for the temp
var canvas2; //canvas for the humidity
var context1; //context for temp
var context2; //context for humidity
var color1 = '';
var color2 = '';
var hot1 = "red";
var hot2 = "#370F05";
var warm1 = "orange";
var warm2 = "#A01F02";
var mild1 = "yellow";
var mild2 = "#ECA239";
var cool1 = "green";
var cool2 = "#013220";
var cold1 = "blue";
var cold2 = "#0F1644";
var freeze1 = "#36C6E0";
var freeze2 = "#B2EBF2";

$(document).ready(function(){
	var apiKey = 'f4e549423f2e6705f04e43427cc36466';
	canvas1 = document.getElementById('current-temp');
	canvas2 = document.getElementById('current-humidity');
	context1 = canvas1.getContext('2d');
	context2 = canvas2.getContext('2d');	
	$('.weather-form').submit(function(){
		//keep user from submitting
		event.preventDefault();
		var cityText = $('.city').val();

		//build the url from the user input and our api key
		var url = 'http://api.openweathermap.org/data/2.5/forecast/city?q='+cityText+',us&units=imperial&APPID='+ apiKey;

		// go get the JSON from the contructed url
		$.getJSON(url,function(weatherData){
			// set up a variable for the user's city temp
			// find temp
			currentTemp = weatherData.list[0].main.temp;
			console.log(currentTemp);
			// sets color for temps
			if(currentTemp < 33){
				$('#big-temp').css({'color': '#36C6E0'});
				drawGradient(0, freeze1, freeze2);
			}else if((33 < currentTemp) && (currentTemp <= 45)){
				$('#big-temp').css({'color': 'blue'});
				drawGradient(0, cold1, cold2);
			}else if((44 < currentTemp) && (currentTemp <= 60)){
				$('#big-temp').css({'color': 'green'});
				drawGradient(0, cool1, cool2);
			}else if((currentTemp > 60) && (currentTemp <= 75)){
				$('#big-temp').css({'color': 'yellow'});
				drawGradient(0, mild1, mild2);
			}else if((currentTemp > 75) && (currentTemp <= 90)){
				console.log('kjkhkhj')
				$('#big-temp').css({'color': 'orange'});
				drawGradient(0, warm1, warm2);
			}else{
				$('#big-temp').css({'color': 'red'});
				drawGradient(0, hot1, hot2);
				console.log(hot1);
			}
			console.log(weatherData);
			// find humidity
			currentHumidity = weatherData.list[0].main.humidity;
			if((currentHumidity >= 0) && (currentHumidity <= 33)){
				animateHumidity(0, hot2);
			}else if((currentHumidity > 33) && (currentHumidity <= 66)){
				animateHumidity(0, mild2);
			}else{
				animateHumidity(0, freeze1);
			}
			$('#big-temp').html(currentTemp);
			$('#humidity').html(currentHumidity);
			console.log(weatherData);
			weatherId = weatherData.list[0].weather[0].id;
			weatherIcon = weatherData.list[0].weather[0].icon;
			console.log(weatherId);
			console.log(weatherIcon);
			var imgUrl = 'http://openweathermap.org/img/w/'+weatherIcon+'.png'
			$('#icon').attr('src', imgUrl);
			$('#icon').css({'height': '100px', 'width': '100px'})
			// weather description.
			var description = weatherData.list[0].weather[0].description;
			var capFirst = description.slice(0,1).toUpperCase();
			var theRest = description.slice(1,description.length);
			var fullDescription = capFirst + theRest;
			$('.description').html(fullDescription);
		})
	})
})

function animateHumidity(current, color){
	//clears everything
	context2.clearRect(0,0,70,70);
	context2.strokeStyle = color;

	//I'm ready to draw
	context2.beginPath();

	context2.arc(35, 35, 10, Math.PI * 1.5, (current/100) * (Math.PI * 2) + (Math.PI * 1.5));
	context2.lineWidth = 10;
	//draw that circle
	context2.stroke();
	current++;
	if(current < currentHumidity){
		requestAnimationFrame(function(){
			animateHumidity(current, color);
		})
	}
}
function drawGradient(current, color1, color2){
	context1.clearRect(0,0,50,200);
	//temperature color & gradient color
	var grd = context1.createLinearGradient(30,0,0,0);
	grd.addColorStop(0, color1);
	grd.addColorStop(1, color2);
	context1.lineWidth = 10;
	// for temp
	context1.beginPath();
	context1.fillStyle = grd;
	context1.fillRect(5,195,20,6-(current*1.5));
	current++;
	if(current < currentTemp){
		requestAnimationFrame(function(){
			drawGradient(current,color1,color2);
		})
	}
}