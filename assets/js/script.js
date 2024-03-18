
//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}


document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', function(event) {
        event.preventDefault();
        const cityValue = document.getElementById('cityInput').value;
        console.log('City:', cityValue);

        //Looks for the searchHistory in local storage and if it doesn't exist, sets it to an empty array
        const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

        //add the cityValue to the searchHistory array
        searchHistory.push(cityValue);

        //Save the searchHistory array to local storage
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

        //Call the function to display the search results
        displaySearchResults(searchHistory);

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

    function displaySearchResults(searchHistory) {
        const searchResultsContainer = document.getElementById('searchResults');
        searchResultsContainer.innerHTML = ''; // Clear previous search results
        
        // Iterate over each city in the search history array
        searchHistory.forEach(function(city) {
            // Create a list item for each city and append it to the search results container
            const listItem = document.createElement('li');
            listItem.className = 'collection-item';
            listItem.textContent = city;
            searchResultsContainer.appendChild(listItem);
        });
    }

    // Call the function to display the search results when the page loads
    displaySearchResults(JSON.parse(localStorage.getItem('searchHistory')));
});

