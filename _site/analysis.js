window.onload = async function() {

      fetch("./data/countries.json").then(response => response.json()).then(res => {

        const countryList = [];

        for(i = 0; i < res.length; i++) {
            countryList.push(res[i].name)
        }
        
        console.log(countryList)
        

        // var query = document.getElementById('country').value;
         
        const form = document.getElementById('getCountryData');
        
        form.addEventListener('submit', function(e) {
            
            var query = document.getElementById('country').value;
            const options = {
                includeScore: true,
                // Search in `author` and in `tags` array
                keys: ['name']
            }
            const fuse = new Fuse(countryList, options)
            const result = fuse.search(query)
            const country = result[0].item;
            console.log(country)
            document.getElementById('subtitle').innerHTML = 'Showing results for : ' + ' ' + country
        

            fetch(`https://covid-19-data.p.rapidapi.com/country?format=json&name=${country}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
                    "x-rapidapi-key": "YOUR-API-KEY"
                }
            }).then(response => response.json()).then(res => {
                console.log(res)
                document.getElementById('cases').innerHTML = numeral(res[0].confirmed).format('0,0');
                document.getElementById('deaths').innerHTML =numeral( res[0].deaths).format('0,0');
                document.getElementById('recovered').innerHTML = numeral(res[0].recovered).format('0,0');


            }).catch(err => {
                console.log(err);
            })
            
            e.preventDefault()
        })
    })
}
