var url = 'http://api.tiles.mapbox.com/v3/mapbox.mapbox-light,';
var m, interaction;
var layer = 'danwood.crime10hex';
var legend;

//should i include lat, lon, z?
//function buildMap(layers, lat, lon, z, l) {

function buildMap(layer) {
	wax.tilejson(url + layer + '.jsonp', function(tilejson) {
	var m = new MM.Map('mymap', new wax.mm.connector(tilejson));

	$('.wax-legend, .wax-tooltip').remove();

	interaction = wax.mm.interaction()
	  .map(m)
	  .tilejson(tilejson)
	  .on(wax.tooltip().animate(true).parent(m.parent).events());
	 wax.mm.zoomer(m).appendTo(m.parent);
	 m.setCenterZoom({ lat: 38.901, lon: -77.078 }, 12);

	wax.mm.legend(m, tilejson).appendTo(m.parent);
	});
}

$(function() {
	buildMap(layer);

	$('ul.layerswitcher a').click(function (e) {
      e.preventDefault();
      $('ul.layerswitcher a').removeClass('active');
      $(this).addClass('active');
      layer = $(this).attr('data-layer');

      // To change the height of the bar in the sidebar we assign 
      // and id here and change it in the css
      var borderBar = $(this).attr('data-name');
      $('.border-bar').attr('id', borderBar);
      buildMap(layer);
	});
});