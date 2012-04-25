var map, interaction;
var mm = com.modestmaps;
var layer = 'danwood.crime10hex';
var urlBase ='http://api.tiles.mapbox.com/v3/mapbox.mapbox-light,';
var url = urlBase + layer + '.jsonp';


wax.tilejson (url, function(tilejson) {
    tilejson.minzoom = 8;
      tilejson.maxzoom = 16;
m = new mm.Map('mymap', new wax.mm.connector(tilejson), null, [
        new mm.MouseHandler(),
        new mm.TouchHandler()
        ]
    );
    m.setCenterZoom(new mm.Location( 38.901,-77.078), 12);
    tilejson.attribution = 'Powered by open source <a href="http://tilemill.com" target="_blank"> TileMill</a> ';
    wax.mm.legend(m, tilejson).appendTo(m.parent);
    wax.mm.interaction(m, tilejson)
    wax.mm.attribution(m, tilejson).appendTo(m.parent);
    wax.mm.zoomer(m, tilejson).appendTo($('#controls')[0]);
    wax.mm.bwdetect(m, {
        auto: true,
        png: '.png64?'
    });
});


$('ul.layerswitcher a').click(function (e) {
      e.preventDefault();
      $('ul.layerswitcher a').removeClass('active');
      $(this).addClass('active');
      layer = this.id;
	  layers = [
	                urlBase,
	                layer
	            ];

      refreshMap(layers);
    });

  function refreshMap(layers) {
    url = urlBase + layer + '.jsonp';
    wax.tilejson(url, function(tilejson) {
      m.setLayerAt(0, new wax.mm.connector(tilejson));
      interaction.tilejson(tilejson);

      $('.wax-legend').remove();
      wax.mm.legend(m, tilejson).appendTo(m.parent);
      interaction.remove();
      wax.mm.interaction(m, tilejson);
    });
  }

	
