// === Map Setup ===
var indiaBounds = [[6.5,68],[35.5,97.5]];
var map = L.map('map', {maxBounds: indiaBounds,maxBoundsViscosity:1.0}).setView([22.9734,78.6569],5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:'OpenStreetMap', minZoom:5, maxZoom:10
}).addTo(map);

var heatLayer = L.heatLayer([], {radius:40, blur:70, maxZoom:9, gradient:{0.2:'#ffffb2',0.4:'#fecc5c',0.6:'#fd8d3c',0.8:'#f03b20',1.0:'#bd0026'}}).addTo(map);

// City coordinates (partial example, add all your 140 cities)
var cityCoords = {"Ahmedabad":[23.0225,72.5714],"Chennai":[13.0827,80.2707],"Delhi":[28.7041,77.1025]};

// === Chart Setup ===
var ctx = document.getElementById('barChart').getContext('2d');
var barChart = new Chart(ctx,{
    type:'bar',
    data:{
        labels:[],
        datasets:[{label:'Predicted Cases',data:[],backgroundColor:'rgba(255,99,132,0.6)'}]
    },
    options:{responsive:true,plugins:{legend:{display:false}}}
});

// === Update Heatmap + Stats ===
document.getElementById('crimeSelect').addEventListener('change', function(){
    var crime = this.value;
    if(!crime) return;

    fetch('/ml_data/' + crime)
    .then(res=>res.json())
    .then(data=>{
        updateHeatmap(data.normalized);
        updateStats(data.raw);
        updateChart(data.byYear);
    });
});

function updateHeatmap(data){
    var points=[];
    for(var city in data){
        if(cityCoords[city]){
            points.push([cityCoords[city][0], cityCoords[city][1], data[city]*10]);
        }
    }
    heatLayer.setLatLngs(points);
}

function updateStats(raw){
    let total=0;
    let sorted = Object.entries(raw).sort((a,b)=>b[1]-a[1]);
    sorted.forEach(i=>total+=i[1]);
    document.getElementById('totalCases').innerText="Total Predicted Cases: "+total;
    document.getElementById('citiesAffected').innerText="Cities Affected: "+sorted.length;
    document.getElementById('highestCity').innerText="Highest Risk City: "+(sorted[0]?sorted[0][0]:'-');

    let list = document.getElementById('topCities');
    list.innerHTML='';
    sorted.slice(0,10).forEach(item=>{
        let li=document.createElement('li');
        li.innerText=item[0]+" ("+item[1]+")";
        list.appendChild(li);
    });
}

function updateChart(byYear){
    barChart.data.labels = Object.keys(byYear);
    barChart.data.datasets[0].data = Object.values(byYear);
    barChart.update();
}