var canvas;
var context;

$(document).ready(function(){
	var apiKey = 'f4e549423f2e6705f04e43427cc36466';
	canvas = document.getElementById('current-temp');
	context = canvas.getContext('2d');	
	$('.weather-form').submit(function(){
		//keep user from submitting
		event.preventDefault();
		var cityText = $('.city').val();

		//build the url from the user input and our api key
		var url = 'http://api.openweathermap.org/data/2.5/forecast/city?q='+cityText+',us&units=imperial&APPID='+ apiKey;

		// go get the JSON from the contructed url
		$.getJSON(url,function(weatherData){
			// set up a variable for the user's city temp
			currentTemp = weatherData.list[0].main.temp;
			animate(0);		
		})
	})
})

function animate(current){
	context.clearRect();
	var tempColor = "#ff0000";
	context.strokeStyle = tempColor
	context.lineWidth = 10;
	//lets make sure canvas is ready
	// context.clearRect(0,0,300,300);
	context.beginPath();
	context.arc(155,155,60,Math.PI*0, Math.PI*2);
	context.fill();

	//I'm ready to draw
	context.beginPath();

	context.arc(155, 155, 70, Math.PI * 1.5, (current/100) * (Math.PI * 2) + (Math.PI * 1.5));
	
	//draw that circle
	context.stroke();
	current++;
	if(current < currentTemp){
		requestAnimationFrame(function(){
			animate(current);
		})
	}
}