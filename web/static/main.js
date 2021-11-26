
// define basemap
let basemap01 = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})

let basemap02 = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">Carto</a>'
})

getQuantileBreaks = function (geojson, propertyName, breakNum) {
    let classData = [];
    geojson.features.forEach(feature => {
        classData.push(feature.properties[propertyName]);
    });
    return chroma.limits(classData, "q", breakNum);
}

// map01
var map01 = L.map('map01').setView([39.9597471840457, -75.17893127441406], 14)
basemap02.addTo(map01);
// Add roads
$.getJSON('data/roads.geojson', function (geojson) {
    let quantileBreaks = getQuantileBreaks(geojson, "CLASS", 6);
    L.geoJSON(geojson, {
        style: (feature) => {
            let classNum = feature.properties["CLASS"];
            let c = chroma.scale("viridis").classes(quantileBreaks)(feature.properties["CLASS"])
            let w = classNum > 8 ? 0 :
                classNum >= 5 ? 0.5 :
                    classNum >= 3 ? 1 :
                        1.5
            let o = (w / 2.5) / 1

            return {
                weight: .9,
                color: c,
                opacity: o,
            };
        }
    }).bringToBack().addTo(map01)
})
// Add street view points
$.getJSON('data/streetViewPoints.geojson', function (geojson) {
    L.geoJSON(geojson, {
        pointToLayer: function (feature, latlng) {
            return L.circle(latlng, {
                color: chroma.scale("viridis")(0),
                opacity: 1,
                weight: 1,
                radius: 20,
            })
        },
    }).bringToFront().addTo(map01)
})


var map02 = L.map('map02').setView([39.9597471840457, -75.17893127441406], 14)
basemap02.addTo(map02);

var map03 = L.map('map03').setView([39.9597471840457, -75.17893127441406], 14)
basemap02.addTo(map03);

var map04 = L.map('map04').setView([39.9597471840457, -75.17893127441406], 14)
basemap02.addTo(map04);

var map05 = L.map('map05').setView([39.9597471840457, -75.17893127441406], 14)
basemap02.addTo(map05);