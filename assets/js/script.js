
//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}


document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', function(event) {
        event.preventDefault();
        const cityValue = document.getElementById('cityInput').value;
        console.log('City:', cityValue);
    })
})

