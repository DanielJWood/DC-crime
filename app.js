// Your map's TileJSON url. Define your map layers here.
	var url = 'http://api.tiles.mapbox.com/v3/mapbox.mapbox-light,danwood.crime10hex.jsonp'
	
	wax.tilejson(url, function(tilejson) {
		// Set up a new map in a div with id 'mymap'
		var map = new MM.Map('mymap',
		// Add a new map layer with Wax's connector
			new wax.mm.connector(tilejson));
	      // Add zoom controls
		wax.mm.zoomer(map, tilejson).appendTo(map.parent);
      // Add interactivity (tooltips)
		var interaction = wax.mm.interaction().map(map).tilejson(tilejson)
	  	.on(wax.tooltip().parent(map.parent).events());
		// Add map attribution
		wax.mm.attribution(map, tilejson).appendTo(map.parent);
      // Set the initial center and zoom level
	map.setCenterZoom({ lat: 38.901, lon:-77.078 }, 12);
	});