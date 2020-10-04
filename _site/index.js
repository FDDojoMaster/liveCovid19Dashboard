window.onload = async function () {

    let url = "https://covid-19-data.p.rapidapi.com/totals?format=json"

    let response = await fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
            "x-rapidapi-key": "YOUR-API-KEY"
        }
    }).then(response => response.json())
        .then((res) => {
            console.log(res)
            const date = JSON.stringify(res[0].lastChange);
            console.log(date)

            var obj = res[0];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    console.log(key + " -> " + obj[key]);
                    // DISPLAY CASES IN DOM
                    document.getElementById('total-cases').innerHTML = numeral(res[0].confirmed).format('0,0');
                    document.getElementById('date-total').innerHTML = new Date(date.substr(1, 10));

                    // DISPLAY DEATHS IN DOM

                    document.getElementById('total-deaths').innerHTML = numeral(res[0].deaths).format('0,0');
                    document.getElementById('date-deaths').innerHTML = new Date(date.substr(1, 10));

                    // DISPLAY RECOVERED IN DOM

                    document.getElementById('total-recovered').innerHTML = numeral(res[0].recovered).format('0,0');
                    document.getElementById('date-recovered').innerHTML = new Date(date.substr(1, 10));
                }
            }
            console.log(obj)    
        })

     // HISTORICAL DATA

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };


    fetch("https://api.covid19api.com/total/country/united-kingdom", requestOptions)
        .then(response => response.json())
        .then(result => {
            this.console.log(result)
            var historical_dates = [];
            for(var i = 0; i <result.length; i++) {
                var obj = JSON.stringify((result[i].Date));
                historical_dates.push(obj)
                
                // this.console.log(obj);
            }
            var historical_cases = [];
            for (var x = 0; x < result.length; x++) {
                var caseobj = (result[x].Confirmed);
                
                historical_cases.push(caseobj)
                
            }
            var ctx = document.getElementById('myChart').getContext('2d');
            
            // this.console.log(historical_dates)
            var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'line',

                // Cases Data
                data: {
                    labels: historical_dates,
                    datasets: [{
                        label: 'Cases',
                        borderColor: 'rgb(255, 99, 132)',
                        data: historical_cases

                    }]
                },

                // Configuration options go here
                options: {
                    scales: {

                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Deaths',
                            }
                        }],

                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Number of Cases'
                            }
                        }]
                    },     
                }
            });

        }).catch(error => console.log('error', error));
}


/*

TODO:

- Add Secondary Y-axis.
- Add Deaths Data to Chart.



*/





