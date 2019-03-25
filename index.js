const request = require('request'); // API call dependency
const argv = require('yargs').argv; // Interactive command line dependency

let apiKey = '429e5a55f12aaaa549339afb4f3469d4'; // Mask API key later
let city = argv.c || 'portland'; // User defined or Portland by default 
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`; 

// Function makes API request to OpenWeather, displays temperature in a given city 
request(url, function(err, response, body) {
	if (err) {
		console.log('error:', error); 
	} else {
		let weather = JSON.parse(body); 
		let message = `It's ${weather.main.temp} degrees in ${weather.name}`;
		console.log(message); 
	}
}); 

