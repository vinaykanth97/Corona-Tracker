// Chart
var $zoho = $zoho || {}; $zoho.salesiq = $zoho.salesiq || { widgetcode: "siqa1f21a10b9a05ab5fa3c8f2c57e9bb83ee40b764a702a4467458badef1a0e562", values: {}, ready: function () { } }; var d = document; s = d.createElement("script"); s.type = "text/javascript"; s.id = "zsiqscript"; s.defer = true; s.src = "https://salesiq.zohopublic.com/widget"; t = d.getElementsByTagName("script")[0]; t.parentNode.insertBefore(s, t);
var options = {
    series: [{
        name: 'People',
        data: [44, 33, 22]
    }],
    chart: {
        height: 350,
        type: 'bar',
        events: {
            click: function (chart, w, e) {
                // console.log(chart, w, e)
            }
        }
    },
    colors: ['rgba(46, 147, 250, 0.5)', 'rgba(102, 218, 38, 0.5)', 'rgba(205, 92, 92, 0.5)'],

    plotOptions: {
        bar: {
            columnWidth: '40%',
            distributed: true
        }
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        show: true
    },
    xaxis: {
        categories: [
            ['Infected'],
            ['Recovered'],
            ['Deaths'],
        ],
        labels: {
            style: {
                colors: '#555',
                fontSize: '12px'
            }
        }
    }
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

function GetCountry() {
    fetch('https://covid19.mathdro.id/api/countries').then(res => {
        res.json().then(data => {
            let selectCountry = data.countries.filter(country => {
                let optionElement = document.createElement('option')
                let optionElementText = document.createTextNode(`${country.name}`)
                optionElement.setAttribute('value', `${country.name}`)
                optionElement.appendChild(optionElementText)
                document.getElementById('country-list').appendChild(optionElement)
            })
        })
    })
}
GetCountry()

// Number of Cases in each country
function OverallCovidList() {
    fetch('https://covid19.mathdro.id/api').then(res => {
        res.json().then(data => {
            document.getElementById('infected-numbers').innerHTML = data.confirmed.value.toLocaleString("en-US")
            document.getElementById('recovered-numbers').innerHTML = data.recovered.value.toLocaleString("en-US")
            document.getElementById('death-numbers').innerHTML = data.deaths.value.toLocaleString("en-US")
            chart.updateSeries([{
                data: [data.confirmed.value, data.recovered.value, data.deaths.value]
            }])
        })
    })
}
OverallCovidList()





// Number of infected, recovered, Death in CountryWise
document.getElementById('country-list').addEventListener('change', function (e) {
    if (e.target.value == "Global") {
        OverallCovidList()

    }
    fetch(`https://covid19.mathdro.id/api/countries/${this.value}`, {
        type: 'POST',
        data: JSON.stringify({ 'corona': this.value }),
        contentType: 'application/json',
        dataType: 'json',
    }
    )
        .then(res => {
            res.json().then(data => {
                document.querySelector('.current-country').innerText = this.value
                document.getElementById('infected-numbers').innerHTML = data.confirmed.value.toLocaleString("en-US")
                document.getElementById('recovered-numbers').innerHTML = data.recovered.value.toLocaleString("en-US")
                document.getElementById('death-numbers').innerHTML = data.deaths.value.toLocaleString("en-US")

                chart.updateSeries([{
                    data: [data.confirmed.value, data.recovered.value, data.deaths.value]
                }])

            })
        })
})

  
