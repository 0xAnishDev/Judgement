document.getElementById("crimeSelect").addEventListener("change", function() {

    let crime = this.value

    fetch(`/crime/${crime}`)
    .then(res => res.json())
    .then(data => {

        console.log(data)

        updateHeatmap(data)

    })

})