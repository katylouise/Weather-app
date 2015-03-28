var https = require("https");
var postalcode = require("./postcode-converter.js");
var location = postalcode.get(process.argv[2], process.argv[3])


//Print current weather
function printMessage(city, temp, type) {
	var message = "The weather in " + city + " is " + type + ". The current temperature is " + temp + " degrees Fahrenheit.";
	console.log(message);
}

//Print out error messages
function printError(error) {
	console.error(error.message);
}


//Connect to API URL
	var request = https.get("https://api.forecast.io/forecast/6f4d47152e3a34f83d3c4c92631efb7c/" + location[0] + ",%20" + location[1], function(response) {

	var dataStream = "";

	response.on("data", function(chunk) {
		dataStream += chunk;
	});

	response.on("end", function() {
		if (response.statusCode === 200) {
					try {
						var currentWeather = JSON.parse(dataStream).currently;
						var typeWeather = currentWeather.summary;
						var tempWeather = Math.floor(currentWeather.temperature);
						printMessage(location, tempWeather, typeWeather);
						
					} catch(error) {
						printError(error);
					}
				}
				else {
					printError({message: "There was an error finding the weather for " + location + ".(" + http.STATUS_CODES[response.statusCode] + ")"});
			
			}
		});
	});
	request.on("error", printError);


//module.exports.getWeather = getWeather;