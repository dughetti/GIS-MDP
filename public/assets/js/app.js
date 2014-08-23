var map, centroSaludSearch = [], bibliotecaSearch = [], museoSearch = [];

$(document).ready(function() {
  getViewport();
});

function getViewport() {
  if (sidebar.isVisible()) {
    map.setActiveArea({
      position: "absolute",
      top: "0px",
      left: $(".leaflet-sidebar").css("width"),
      right: "0px",
      height: $("#map").css("height")
    });
  } else {
    map.setActiveArea({
      position: "absolute",
      top: "0px",
      left: "0px",
      right: "0px",
      height: $("#map").css("height")
    });
  }
}

function sidebarClick(id) {
  /* If sidebar takes up entire screen, hide it and go to the map */
  if (document.body.clientWidth <= 767) {
    sidebar.hide();
    getViewport();
  }
  map.addLayer(centroSaludLayer).addLayer(museoLayer).add(educacionMunicipalLayer);
  var layer = markerClusters.getLayer(id);
  markerClusters.zoomToShowLayer(layer, function() {
    map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 18);
    layer.fire("click");
  });
}

/* Basemap Layers */
var mapquestOSM = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png", {
  maxZoom: 19,
  subdomains: ["otile1", "otile2", "otile3", "otile4"],
  attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA.'
});
var mapquestOAM = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
  maxZoom: 18,
  subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"],
  attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a>. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
});
var mapquestHYB = L.layerGroup([L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg", {
  maxZoom: 18,
  subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"]
}), L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/hyb/{z}/{x}/{y}.png", {
  maxZoom: 19,
  subdomains: ["oatile1", "oatile2", "oatile3", "oatile4"],
  attribution: 'Labels courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA. Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
})]);

/* Overlay Layers */
var highlight = L.geoJson(null);

/* Single marker cluster layer to hold all clusters */
var markerClusters = new L.MarkerClusterGroup({
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  disableClusteringAtZoom: 16
});

/* Empty layer placeholder to add to layer control for listening when to add/remove museums to markerClusters layer */
var centroSaludLayer = L.geoJson(null);
var centroSalud = createGeoJsonLayer("assets/img/hospital.png", "salud-table", centroSaludSearch, "Salud", "api/gis/centros_de_salud", centroSaludLayer);

/* Empty layer placeholder to add to layer control for listening when to add/remove museums to markerClusters layer */
var museoLayer = L.geoJson(null);
var museo = createGeoJsonLayer("assets/img/museum.png", "museo-table", museoSearch, "Museo", "api/gis/museo", museoLayer);

/* Empty layer placeholder to add to layer control for listening when to add/remove theaters to markerClusters layer */
var educacionMunicipalLayer = L.geoJson(null);
var educacionMunicipal = createGeoJsonLayer("assets/img/educacion.png", null, null, null, "api/gis/educacion_publica_municipal", educacionMunicipalLayer);

//var myLayer = L.geoJson().addTo(map);

$.getJSON("/data/bicisendas.json", function (data) {
  L.geoJson(data).addTo(map);
});

var parkingLayer = L.geoJson(null);
var parking = createGeoJsonLayer("assets/img/parkingbike2.png", null, null, null, "/data/estacionamientos.json", parkingLayer);

var collegeLayer = L.geoJson(null);
var college = createGeoJsonLayer("assets/img/uni.png", null, null, null, "/data/universidades.json", collegeLayer);

map = L.map("map", {
  zoom: 10,
  center: [-38.000161307805,-57.5567078976633],
  layers: [mapquestOSM,markerClusters, highlight],
  zoomControl: false,
  attributionControl: false
});

/* Layer control listeners that allow for a single markerClusters layer */
map.on("overlayadd", function(e) {
  if (e.layer === centroSaludLayer) {
    markerClusters.addLayer(centroSalud);
  }
  if (e.layer === museoLayer) {
    markerClusters.addLayer(museo);
  }
  if (e.layer === educacionMunicipalLayer) {
    markerClusters.addLayer(educacionMunicipal);
  }
  if (e.layer === parkingLayer) {
    markerClusters.addLayer(parking);
  }
  if (e.layer === collegeLayer) {
    markerClusters.addLayer(college);
  }
});

map.on("overlayremove", function(e) {
  if (e.layer === centroSaludLayer) {
    markerClusters.removeLayer(centroSalud);
  }
  if (e.layer === museoLayer) {
    markerClusters.removeLayer(museo);
  }
  if (e.layer === educacionMunicipalLayer) {
    markerClusters.removeLayer(educacionMunicipal);
  }
  if (e.layer === parkingLayer) {
    markerClusters.removeLayer(parking);
  }
  if (e.layer === collegeLayer) {
    markerClusters.removeLayer(college);
  }
});

/* Clear feature highlight when map is clicked */
map.on("click", function(e) {
  highlight.clearLayers();
  var complaint = window.prompt("Por favor ingrese su reclamo");
  if (complaint != null && complaint !== "")
    $.post('api/reports/', {
      position: {
        lat: e.latlng.lat,
        lng: e.latlng.lng
      }, 
      complaint: complaint
    });
});

/* Attribution control */
function updateAttribution(e) {
  $.each(map._layers, function(index, layer) {
    if (layer.getAttribution) {
      $("#attribution").html((layer.getAttribution()));
    }
  });
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);


var zoomControl = L.control.zoom({
  position: "bottomright"
}).addTo(map);

/* GPS enabled geolocation control set to follow the user's location */
var locateControl = L.control.locate({
  position: "bottomright",
  drawCircle: true,
  follow: true,
  setView: true,
  keepCurrentZoomLevel: true,
  markerStyle: {
    weight: 1,
    opacity: 0.8,
    fillOpacity: 0.8
  },
  circleStyle: {
    weight: 1,
    clickable: false
  },
  icon: "icon-direction",
  metric: false,
  strings: {
    title: "Mi ubicación",
    popup: "Usted se encuentra dentro de {distance} {unit} de este punto.",
    outsideMapBoundsMsg: "Esta fuera de los limites del mapa"
  },
  locateOptions: {
    maxZoom: 18,
    watch: true,
    enableHighAccuracy: true,
    maximumAge: 10000,
    timeout: 10000
  }
}).addTo(map);

//map.on('locationfound', function(){alert("hello");});

var sidebar = L.control.sidebar("sidebar", {
  closeButton: true,
  position: "left"
}).on("shown", function () {
  getViewport();
}).on("hidden", function () {
  getViewport();
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
  var isCollapsed = true;
} else {
  var isCollapsed = false;
  sidebar.show();
}

var baseLayers = {
  "Street Map": mapquestOSM,
  "Aerial Imagery": mapquestOAM,
  "Imagery with Streets": mapquestHYB
};

var groupedOverlays = {
  "Points of Interest": {
    "<img src='assets/img/hospital.png' width='30' height='40'>&nbsp;Salud": centroSaludLayer,
    "<img src='assets/img/educacion.png' width='30' height='40'>&nbsp;Educacion": educacionMunicipalLayer,
    "<img src='assets/img/parkingbike2.png' width='30' height='40'>&nbsp;Parking": parkingLayer,
    "<img src='assets/img/uni.png' width='30' height='40'>&nbsp;College": collegeLayer,
    "<img src='assets/img/museum.png' width='30' height='40'>&nbsp;Museo": museoLayer
  }
};

var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, {
  collapsed: isCollapsed
}).addTo(map);

/* Highlight search box text on click */
$("#searchbox").click(function () {
  $(this).select();
});

/* Typeahead search functionality */
$(document).one("ajaxStop", function () {
  /* Fit map to boroughs bounds */
  // map.fitBounds(boroughs.getBounds());
  $("#loading").hide();

  // var boroughsBH = new Bloodhound({
  //   name: "Boroughs",
  //   datumTokenizer: function (d) {
  //     return Bloodhound.tokenizers.whitespace(d.name);
  //   },
  //   queryTokenizer: Bloodhound.tokenizers.whitespace,
  //   local: boroughSearch,
  //   limit: 10
  // });

var centroBH = new Bloodhound({
  name: "Salud",
  datumTokenizer: function (d) {
    return Bloodhound.tokenizers.whitespace(d.descripcion);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  local: centroSaludSearch,
  limit: 10
});
var saludList = new List("salud", {valueNames: ["salud-descripcion"]}).sort("salud-descripcion", {order:"asc"});

var museoBH = new Bloodhound({
  name: "Museo",
  datumTokenizer: function (d) {
    return Bloodhound.tokenizers.whitespace(d.descripcion);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  local: museoSearch,
  limit: 10
});
var museoList = new List("museo", {valueNames: ["museo-descripcion", "museo-ubicacion"]}).sort("museo-descripcion", {order:"asc"});

var geonamesBH = new Bloodhound({
  name: "GeoNames",
  datumTokenizer: function (d) {
    return Bloodhound.tokenizers.whitespace(d.name);
  },
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  remote: {
    url: "http://api.geonames.org/searchJSON?username=bootleaf&featureClass=P&maxRows=5&countryCode=US&name_startsWith=%QUERY",
    filter: function (data) {
      return $.map(data.geonames, function (result) {
        return {
          name: result.name + ", " + result.adminCode1,
          lat: result.lat,
          lng: result.lng,
          source: "GeoNames"
        };
      });
    },
    ajax: {
      beforeSend: function (jqXhr, settings) {
        settings.url += "&east=" + map.getBounds().getEast() + "&west=" + map.getBounds().getWest() + "&north=" + map.getBounds().getNorth() + "&south=" + map.getBounds().getSouth();
        $("#searchicon").removeClass("fa-search").addClass("fa-refresh fa-spin");
      },
      complete: function (jqXHR, status) {
        $('#searchicon').removeClass("fa-refresh fa-spin").addClass("fa-search");
      }
    }
  },
  limit: 10
});

museoBH.initialize();
geonamesBH.initialize();
centroBH.initialize();


/* instantiate the typeahead UI */
$("#searchbox").typeahead({
  minLength: 3,
  highlight: true,
  hint: false
}, {
  name: "Salud",
  displayKey: "descripcion",
  source: centroBH.ttAdapter(),
  templates: {
    header: "<h4 class='typeahead-header'><img src='assets/img/hospital.png' width='30' height='40'>&nbsp;Salud</h4>",
    suggestion: Handlebars.compile(["{{descripcion}}<br>&nbsp;<small>{{ubicacion}}</small>"].join(""))
  }
}, {
  name: "Museo",
  displayKey: "descripcion",
  source: museoBH.ttAdapter(),
  templates: {
    header: "<h4 class='typeahead-header'><img src='assets/img/museum.png' width='30' height='40'>&nbsp;Museo</h4>",
    suggestion: Handlebars.compile(["{{descripcion}}<br>&nbsp;<small>{{ubicacion}}</small>"].join(""))
  }
}, {
  name: "GeoNames",
  displayKey: "name",
  source: geonamesBH.ttAdapter(),
  templates: {
    header: "<h4 class='typeahead-header'><img src='assets/img/globe.png' width='25' height='25'>&nbsp;GeoNames</h4>"
  }
}).on("typeahead:selected", function (obj, datum) {
  if (datum.source === "Salud") {
    if (!map.hasLayer(centroSaludLayer)) {
      map.addLayer(centroSaludLayer);
    }
    map.setView([datum.lat, datum.lng], 17);
    if (map._layers[datum.id]) {
      map._layers[datum.id].fire("click");
    }
  }
  if (datum.source === "Museo") {
    if (!map.hasLayer(museoLayer)) {
      map.addLayer(museoLayer);
    }
    map.setView([datum.lat, datum.lng], 17);
    if (map._layers[datum.id]) {
      map._layers[datum.id].fire("click");
    }
  }
  if (datum.source === "GeoNames") {
    map.setView([datum.lat, datum.lng], 14);
  }
  if ($(".navbar-collapse").height() > 50) {
    $(".navbar-collapse").collapse("hide");
  }
}).on("typeahead:opened", function () {
  $(".navbar-collapse.in").css("max-height", $(document).height() - $(".navbar-header").height());
  $(".navbar-collapse.in").css("height", $(document).height() - $(".navbar-header").height());
}).on("typeahead:closed", function () {
  $(".navbar-collapse.in").css("max-height", "");
  $(".navbar-collapse.in").css("height", "");
});
$(".twitter-typeahead").css("position", "static");
$(".twitter-typeahead").css("display", "block");
});

function createGeoJsonLayer(iconUrl, tableId, searcher, source, apiUrl, layer) {
  var realLayer = L.geoJson(null, {
    pointToLayer: function (feature, latlng) {
      var marker = L.marker(latlng, {
        icon: L.icon({
          iconUrl: iconUrl,
          iconSize: [30, 40],
          iconAnchor: [12, 40],
          popupAnchor: [0, -25]
        }),
        title: feature.properties.descripcion,
        riseOnHover: true
      })  ;
      var content = "<h4 style=\"color: #428bca;\">" + feature.properties.descripcion + "</h4><table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Descripcion</th><td>" + feature.properties.descripcion + "</td></tr>" + "<tr><th>Ubicación</th><td>" + feature.properties.ubicacion + "</td></tr>" + "<table>";
      var popup = marker.bindPopup(content);
      marker.on({click: function(e) {
        popup.openPopup();
      }});

      return marker;
    },
    onEachFeature: function (feature, layer) {
      if (feature.properties) {
        var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Descripcion</th><td>" + feature.properties.descripcion + "</td></tr>" + "<tr><th>Ubicación</th><td>" + feature.properties.ubicacion + "</td></tr>" + "<table>";
        layer.on({
          click: function (e) {
            highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
              stroke: false,
              fillColor: "#00FFFF",
              fillOpacity: 0.7,
              radius: 10
            }));
          }
        });
        if(tableId != null) {
          $("#" + tableId + " tbody").append('<tr style="cursor: pointer;" onclick="sidebarClick('+L.stamp(layer)+'); return false;"><td class="museo-descripcion">'+layer.feature.properties.descripcion+'<i class="fa fa-chevron-right pull-right"></td></tr>');
        }
        if (searcher != null) {
          searcher.push({
            descripcion: layer.feature.properties.descripcion,
            ubicacion: layer.feature.properties.ubicacion,
            source: source,
            id: L.stamp(layer),
            lat: layer.feature.geometry.coordinates[1],
            lng: layer.feature.geometry.coordinates[0]
          });
        }
      }
    }
  });
  $.getJSON(apiUrl, function (data) {
    realLayer.addData(data.return);
    map.addLayer(layer);
  });
  return realLayer;
}
