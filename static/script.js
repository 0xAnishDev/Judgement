var indiaBounds = [
    [6.5, 68.0],   // Southwest corner
    [35.5, 97.5]   // Northeast corner
]

var map = L.map('map', {
    maxBounds: indiaBounds,
    maxBoundsViscosity: 1.0
}).setView([22.9734, 78.6569], 5)

var cityCoords = {
    "Mumbai":[19.0760,72.8777],
    "Delhi":[28.7041,77.1025],
    "Bangalore":[12.9716,77.5946],
    "Chennai":[13.0827,80.2707],
    "Kolkata":[22.5726,88.3639],
    "Hyderabad":[17.3850,78.4867],
    "Ahmedabad":[23.0225,72.5714],
    "Pune":[18.5204,73.8567],
    "Agra":[27.1767,78.0081],
    "Bhopal":[23.2599,77.4126]
}

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'OpenStreetMap',
    minZoom: 5,
    maxZoom: 10
}).addTo(map)

var heatLayer = L.heatLayer([], {
    radius: 40,
    blur: 70,
    maxZoom: 9,
    gradient: {
        0.2: "yellow",
        0.4: "orange",
        0.7: "red",
        1.0: "darkred"
    }
}).addTo(map)

document.getElementById("crimeSelect").addEventListener("change", function(){

    var crime = this.value

    console.log("Selected crime:", crime)

    fetch("/crime/" + crime)
        .then(response => response.json())
        .then(data => {

            console.log("API data:", data)

            updateHeatmap(data)

        })

})
console.log("Selected crime:", crime)
console.log("Crime data:", data)

function updateHeatmap(data){

    var points = []

    for (var city in data){

        if(cityCoords[city]){

            var lat = cityCoords[city][0]
            var lon = cityCoords[city][1]

            var intensity = data[city]

            points.push([lat, lon, intensity])

        }

    }

    map.removeLayer(heatLayer)

    heatLayer = L.heatLayer(points, {
        radius: 50,
        blur: 70,
        maxZoom: 9,
        gradient: {
            0.2: "#ffffb2",
            0.4: "#fecc5c",
            0.6: "#fd8d3c",
            0.8: "#f03b20",
            1.0: "#bd0026"
        }
    }).addTo(map)

}

document.getElementById("crimeSelect").dispatchEvent(new Event("change"))