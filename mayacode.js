var url = 'http://api.tiles.mapbox.com/v3/mapbox.mapbox-light,';
var m, interaction;
var layer = 'danwood.crime10hex';
var legend;

function buildMap(layer) {
	wax.tilejson(url + layer + '.jsonp', function(tilejson) {
	var m = new MM.Map('mymap', new wax.mm.connector(tilejson));

	$('.wax-legend').remove(); //the legend stacks with the build so needs to be removed first.
	$('a.zoomer').hide(); //i remove the zoomer because it is transparent, and stacks
	$('a.wax-tooltip').remove(); //this doesn't work...
  

	interaction = wax.mm.interaction()
	  .map(m)
	  .tilejson(tilejson)
	  .on(wax.tooltip().animate(true).parent(m.parent).events());
	 wax.mm.zoomer(m).appendTo(m.parent);
	 m.setCenterZoom({ lat: 38.901, lon: -77.078 }, 12);
	wax.mm.legend(m, tilejson).appendTo(m.parent);
	});

}
//could also be $(function() {
$(document).ready(function() { 
	buildMap(layer);
	//The following 2 lines creates the initial crimeinfo data
 	$('.crimeinfo').hide();
 	$('#all').show();

	$('ul.layerswitcher a').click(function (e) {
      e.preventDefault();
      $('ul.layerswitcher a').removeClass('active');
      $(this).addClass('active');
      layer = $(this).attr('data-layer');
     
     // The stuff below changes the crime info at the bottom of the left pane.
      var crimez = $(e.currentTarget).attr('data-name');
      $('.crimeinfo').hide();
      $('#'+crimez).show();

      // To change the height of the bar in the sidebar we assign 
      // and id here and change it in the css
      var borderBar = $(this).attr('data-name');
      $('.border-bar').attr('id', borderBar);
      buildMap(layer); 
      //the last thing it does is build the map^^
   	 
	});
});