var url = 'http://api.tiles.mapbox.com/v3/mapbox.mapbox-light,';
var m, interaction;
var layer = 'danwood.dc-crime-10-dc';
var legend;

function buildMap(layer) {
	wax.tilejson(url + layer + '.jsonp', function(tilejson) {
	  //if m is not defined create it, if it is already defined go to else
    if (!m) { 
      m = new MM.Map('mymap', new wax.mm.connector(tilejson));

      interaction = wax.mm.interaction()
        .map(m)
        .tilejson(tilejson)
        .on(wax.tooltip().animate(true).parent(m.parent).events());

      wax.mm.zoomer(m).appendTo(m.parent);

      m.setCenterZoom({ lat: 38.9091, lon: -77.0184 }, 13);

      legend = wax.mm.legend(m, tilejson).appendTo(m.parent);      

    } else {
      $('.wax-legend').remove();
      m.setLayerAt(0, new wax.mm.connector(tilejson));
      interaction.tilejson(tilejson);
      legend.content(tilejson.legend || '');
      wax.mm.legend(m, tilejson).appendTo(m.parent);
      attribution.content(tilejson.attribution || '');
    }
	});
}

//could also be $(function() {
$(document).ready(function() { 
	buildMap(layer);
	//The following 2 lines creates the INITIAL crimeinfo data
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
