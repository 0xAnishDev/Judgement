var indiaBounds = [
    [6.5, 68.0],   // Southwest corner
    [35.5, 97.5]   // Northeast corner
]
var crimeChart = null
var map = L.map('map', {
    maxBounds: indiaBounds,
    maxBoundsViscosity: 1.0
}).setView([22.9734, 78.6569], 5)

var cityCoords = {
    "Ahmedabad":[23.0225,72.5714],
    "Chennai":[13.0827,80.2707],
    "Ludhiana":[30.9010,75.8573],
    "Pune":[18.5204,73.8567],
    "Delhi":[28.7041,77.1025],
    "Mumbai":[19.0760,72.8777],
    "Surat":[21.1702,72.8311],
    "Visakhapatnam":[17.6868,83.2185],
    "Bangalore":[12.9716,77.5946],
    "Kolkata":[22.5726,88.3639],
    "Ghaziabad":[28.6692,77.4538],
    "Hyderabad":[17.3850,78.4867],
    "Jaipur":[26.9124,75.7873],
    "Lucknow":[26.8467,80.9462],
    "Bhopal":[23.2599,77.4126],
    "Patna":[25.5941,85.1376],
    "Kanpur":[26.4499,80.3319],
    "Varanasi":[25.3176,82.9739],
    "Nagpur":[21.1458,79.0882],
    "Meerut":[28.9845,77.7064],
    "Thane":[19.2183,72.9781],
    "Indore":[22.7196,75.8577],
    "Rajkot":[22.3039,70.8022],
    "Vasai":[19.4910,72.8054],
    "Agra":[27.1767,78.0081],
    "Kalyan":[19.2437,73.1355],
    "Nashik":[19.9975,73.7898],
    "Srinagar":[34.0837,74.7973],
    "Faridabad":[28.4089,77.3178]
}

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'OpenStreetMap',
    minZoom: 5,
    maxZoom: 10
}).addTo(map)

fetch("/static/india.geojson")
.then(response => response.json())
.then(data => {

    var indiaLayer = L.geoJSON(data, {
        style: {
            color: "#1b5e20",
            weight: 1,
            fillColor: "#2ecc71",
            fillOpacity: 0.03
        }
    }).addTo(map)

    indiaLayer.bringToBack()

})

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

    if(!crime) return

    fetch("/crime/" + crime)
    .then(response => response.json())
    .then(data => {

        updateHeatmap(data.normalized)
        updateStats(data.raw)
        updateChart(data.yearly)

    })

})


function updateHeatmap(data){

    var points = []

    for (var city in data){

        if(cityCoords[city]){

            var lat = cityCoords[city][0]
            var lon = cityCoords[city][1]

            var intensity = data[city] * 10

            points.push([lat, lon, intensity])

        }

    }

    heatLayer.setLatLngs(points)

}

function updateStats(rawData){

    let total = 0

    let cities = Object.keys(rawData).length

    let sorted = Object.entries(rawData)
        .sort((a,b)=>b[1]-a[1])

    sorted.forEach(item => total += item[1])

    let highestCity = sorted[0][0]

    document.getElementById("totalCases").innerText =
        "Total Cases: " + total

    document.getElementById("citiesAffected").innerText =
        "Cities Affected: " + cities

    document.getElementById("highestCity").innerText =
        "Highest City: " + highestCity

    let list = document.getElementById("topCities")

    list.innerHTML = ""

    sorted.slice(0,5).forEach(city => {

        let li = document.createElement("li")

        li.innerText = city[0] + " (" + city[1] + ")"

        list.appendChild(li)

    })

}

