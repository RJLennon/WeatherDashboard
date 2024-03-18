
//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}


document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', function(event) {
        event.preventDefault();
        const cityValue = document.getElementById('cityInput').value;
        console.log('City:', cityValue);

        //Construct the API URL using the cityValue
        const apiKey = "b9021926c89843416e54f049e9cb56a9"
        const cityApiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&limit=1&appid=${apiKey}`;

        //Fetch the data from the API
        fetch(cityApiURL)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log('Data:', data);
                const latitude = data[0].lat;
                const longitude = data[0].lon;
                console.log('Latitude:', latitude);
                console.log('Longitude:', longitude);

                const weatherApiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
                fetch(weatherApiURL)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(data) {
                        console.log('Weather Data:', data);
                    });
            });
    });
});

