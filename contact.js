function initMap() {

	console.log("initMap function executed");

	// store the "map" div into a variable
	var mapDiv = document.getElementById("map");

	// create a new Google Maps object, it takes 2 arguments:
	// 1) a reference to the div that the map will be loaded into
	// 2) options for the map, such as the center, zoom level, and the map type
	var map = new google.maps.Map(mapDiv, {
		center: {lat: 43.4154077, lng: -80.4946691}, // tells the the API where to center the map
		zoom: 15 // number between 0 (farthest) and 22 that sets the zoom level of the map
	});


};