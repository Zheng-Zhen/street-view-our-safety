
// define basemap
let basemap = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})


// map01
var map01 = L.map('map01').setView([39.9897471840457, -75.13893127441406], 11)
basemap.addTo(map01);
// Add roads
$.getJSON('data/roads.geojson', function (geojson) {
    L.geoJSON(geojson, {
        style: (feature) => {
            let w = 1 - feature.properties["CLASS"] / 5;

            return { weight: w, color: "black" };
        }
    }).addTo(map01)
})
// Add street view points
$.getJSON('data/streetViewPoints.geojson', function (geojson) {
    L.geoJSON(geojson, {
        color: 'orange'
    }).addTo(map01)
})
