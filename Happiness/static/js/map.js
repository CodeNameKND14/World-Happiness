// Creating map object
var myMap = L.map("map", {
  center: [ 15, 15],
  zoom: 2
});

// Adding tile layer
var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
}).addTo(myMap);

// Link to GeoJSON
/*This is the path because it is pulling the informa from where the index.html exists */
var APILink = "/static/json/final.geojson"

var geojson1;
console.log(geojson1)
// Grab data with d3
d3.json(APILink).then(function(data) { 
console.log("--------DATA-----------------")
console.log(data)
// LOOK AT DATA TO TRY AND SEE COLORS 

  // Create a new choropleth layer
  geojson1 = L.choropleth(data, {
    
    // Define what  property in the features to use
    valueProperty: "final_seventeen_happiness_score",

    // Set color scale
    scale: ["#f5f5e0", "#18865c"],

    // Number of breaks in step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },

    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h4>" + feature.properties.ADMIN + "</h4></br>" + "<strong>Happiness Rank: </strong>" + feature.properties.final_seventeen_happiness_rank + "</h4></br>" + "<strong>Population: </strong>" + feature.properties.final_seventeen_population);
    }
  }).addTo(myMap);

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson1.options.limits;
    var colors = geojson1.options.colors;
    var labels = [];

    // Add min & max
    var legendInfo = "<div class=\"labels\">" +
        "<div class=\"min\">" +  "</div>" +
        "<div class=\"max\">" + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };



  // Adding legend to the map
  legend.addTo(myMap);

});
