var http = require("http");



//Print out error messages
function printError(error) {
	console.error(error.message);
}

function returnLatLong(lat, lng) {
	var latLong = [];
	latLong.push(lat, lng);
	return latLong;
	}


function get(postcode, country) {
//Connect to API URL
	var request = http.get("http://api.geonames.org/findNearbyPostalCodesJSON?postalcode=" + postcode + "&country=" + country + "&username=rebeccaappleyard", function(response) {
		var dataStream = "";

		response.on("data", function(chunk) {
			dataStream += chunk;

		});
		response.on("end", function() {
			if (response.statusCode === 200) {
				try {
					var location = JSON.parse(dataStream).postalCodes[0];
					returnLatLong(location.lat, location.lng);
				} catch(error) {
					printError(error);
				}
			}
			else {
				printError({message: "There was an error finding the longtitude and latitude for " + postcode + ".(" + http.STATUS_CODES[response.statusCode] + ")"});
			}
		})
	});

	request.on("error", printError); 

}

module.exports.get = get;