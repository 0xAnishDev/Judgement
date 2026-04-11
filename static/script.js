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
    "Ahmedabad": [23.0225, 72.5714],
    "Chennai": [13.0827, 80.2707],
    "Ludhiana": [30.9010, 75.8573],
    "Pune": [18.5204, 73.8567],
    "Delhi": [28.7041, 77.1025],
    "Mumbai": [19.0760, 72.8777],
    "Surat": [21.1702, 72.8311],
    "Visakhapatnam": [17.6868, 83.2185],
    "Bangalore": [12.9716, 77.5946],
    "Kolkata": [22.5726, 88.3639],
    "Ghaziabad": [28.6692, 77.4538],
    "Hyderabad": [17.3850, 78.4867],
    "Jaipur": [26.9124, 75.7873],
    "Lucknow": [26.8467, 80.9462],
    "Bhopal": [23.2599, 77.4126],
    "Patna": [25.5941, 85.1376],
    "Kanpur": [26.4499, 80.3319],
    "Varanasi": [25.3176, 82.9739],
    "Nagpur": [21.1458, 79.0882],
    "Meerut": [28.9845, 77.7064],
    "Thane": [19.2183, 72.9781],
    "Indore": [22.7196, 75.8577],
    "Rajkot": [22.3039, 70.8022],
    "Vasai": [19.3919, 72.8397],
    "Agra": [27.1767, 78.0081],
    "Kalyan": [19.2403, 73.1305],
    "Nashik": [20.0110, 73.7903],
    "Srinagar": [34.0837, 74.7973],
    "Faridabad": [28.4089, 77.3178],
    "Vadodara": [22.3072, 73.1812],
    "Ranchi": [23.3441, 85.3096],
    "Madurai": [9.9252, 78.1198],
    "Aurangabad": [19.8762, 75.3433],
    "Dhanbad": [23.7957, 86.4304],
    "Amritsar": [31.6340, 74.8723],
    "Allahabad": [25.4358, 81.8463],
    "Gwalior": [26.2183, 78.1828],
    "Jabalpur": [23.1815, 79.9864],
    "Jodhpur": [26.2389, 73.0243],
    "Raipur": [21.2514, 81.6296],
    "Kota": [25.2138, 75.8648],
    "Chandigarh": [30.7333, 76.7794],
    "Thiruvananthapuram": [8.5241, 76.9366],
    "Solapur": [17.6599, 75.9064],
    "Hubli": [15.3647, 75.1240],
    "Bareilly": [28.3670, 79.4304],
    "Moradabad": [28.8386, 78.7733],
    "Mysore": [12.2958, 76.6394],
    "Aligarh": [27.8974, 78.0880],
    "Jalandhar": [31.3260, 75.5762],
    "Tiruchirappalli": [10.7905, 78.7047],
    "Salem": [11.6643, 78.1460],
    "Warangal": [17.9821, 79.5971],
    "Guntur": [16.3067, 80.4365],
    "Bhiwandi": [19.2968, 73.0631],
    "Saharanpur": [29.9640, 77.5460],
    "Gorakhpur": [26.7606, 83.3732],
    "Bikaner": [28.0229, 73.3119],
    "Amravati": [20.9320, 77.7523],
    "Jamshedpur": [22.8046, 86.2029],
    "Bhilai": [21.1938, 81.3509],
    "Cuttack": [20.4625, 85.8830],
    "Firozabad": [27.1590, 78.3957],
    "Bhavnagar": [21.7645, 72.1519],
    "Durgapur": [23.5204, 87.3119],
    "Asansol": [23.6739, 86.9524],
    "Rourkela": [22.2604, 84.8536],
    "Nanded": [19.1383, 77.3210],
    "Kolhapur": [16.7050, 74.2433],
    "Ajmer": [26.4499, 74.6399],
    "Akola": [20.7059, 77.0082],
    "Gulbarga": [17.3297, 76.8343],
    "Jamnagar": [22.4707, 70.0577],
    "Ujjain": [23.1765, 75.7885],
    "Siliguri": [26.7271, 88.3953],
    "Jhansi": [25.4484, 78.5685],
    "Nellore": [14.4426, 79.9865],
    "Jammu": [32.7266, 74.8570],
    "Belgaum": [15.8497, 74.4977],
    "Mangalore": [12.9141, 74.8560],
    "Tirunelveli": [8.7139, 77.7567],
    "Malegaon": [20.5534, 74.5298],
    "Gaya": [24.7914, 85.0002],
    "Jalgaon": [21.0077, 75.5626],
    "Udaipur": [24.5854, 73.7125],
    "Davanagere": [14.4644, 75.9218],
    "Kozhikode": [11.2588, 75.7804],
    "Kurnool": [15.8281, 78.0373],
    "Rajahmundry": [17.0005, 81.8040],
    "Bokaro": [23.6693, 86.1511],
    "Bellary": [15.1394, 76.9214],
    "Patiala": [30.3398, 76.3869],
    "Agartala": [23.8315, 91.2868],
    "Bhagalpur": [25.2425, 86.9842],
    "Muzaffarnagar": [29.4710, 77.7086],
    "Latur": [18.4088, 76.5604],
    "Dhule": [20.9042, 74.7749],
    "Sagar": [23.8388, 78.7378],
    "Korba": [22.3595, 82.6837],
    "Bhilwara": [25.3458, 74.6363],
    "Berhampur": [19.3150, 84.7941],
    "Muzaffarpur": [26.1209, 85.3647],
    "Ahmednagar": [19.0952, 74.7496],
    "Mathura": [27.4924, 77.6737],
    "Kollam": [8.8932, 76.6141],
    "Kadapa": [14.4673, 78.8242],
    "Sambalpur": [21.4669, 83.9812],
    "Bilaspur": [22.0797, 82.1409],
    "Shahjahanpur": [27.8805, 79.9126],
    "Satara": [17.6805, 73.9980],
    "Bijapur": [16.8302, 75.7100],
    "Rampur": [28.8154, 79.0253],
    "Shivamogga": [13.9299, 75.5681],
    "Chandrapur": [19.9615, 79.2961],
    "Junagadh": [21.5222, 70.4579],
    "Thrissur": [10.5276, 76.2144],
    "Alwar": [27.5530, 76.6346],
    "Bardhaman": [23.2324, 87.8615],
    "Kakinada": [16.9891, 82.2475],
    "Nizamabad": [18.6704, 78.0976],
    "Parbhani": [19.2644, 76.7762],
    "Durg": [21.1904, 81.2849],
    "Raigarh": [21.8974, 83.3950],
    "Ambikapur": [23.1355, 83.1818],
    "Jagdalpur": [19.0775, 82.0240],
    "Rajnandgaon": [21.1017, 80.9723],
    "Dhamtari": [20.7072, 81.5498],
    "Kanker": [20.2720, 81.4931],
    "Palghar": [19.6965, 72.7655],
    "Udupi": [13.3409, 74.7421],
    "Kochi": [9.9312, 76.2673],
    "Rohtak": [28.8909, 76.5796],
    "Shimla": [31.1048, 77.1734],
    "Bhubaneswar": [20.2961, 85.8245],
    "Coimbatore": [11.0168, 76.9558],
    "Dehradun": [30.3165, 78.0322],
    "Guwahati": [26.1445, 91.7362],
    "Bharatpur": [27.2152, 77.4932],
    "Sikar": [27.6094, 75.1398],
    "Pali": [25.7711, 73.3234],
    "Churu": [28.2900, 74.9600],
    "Barmer": [25.7521, 71.3967]
};

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

            var intensity = data[city] * 20

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

function fetchAndRender(crime){
    fetch("/ml_data/" + crime)
    .then(res => res.json())
    .then(data => {
        // Convert keys to numbers
        let years = Object.keys(data.byYear).map(Number);

        // Sort numerically
        years.sort((a,b) => a-b);

        const counts = years.map(y => data.byYear[y]);

        const ctx = document.getElementById('yearChart').getContext('2d');

        if(chart) chart.destroy();

        // Different color for predicted years (2025,2026)
        const colors = years.map(y => (y >= 2025 ? 'rgba(255, 99, 132, 0.6)' : 'rgba(54, 162, 235, 0.6)'));
        const borders = years.map(y => (y >= 2025 ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)'));

        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [{
                    label: crime + " cases per year",
                    data: counts,
                    backgroundColor: colors,
                    borderColor: borders,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    });
}