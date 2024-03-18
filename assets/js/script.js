


document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');

    // Add an event listener to the search button
    searchButton.addEventListener('click', function(event) {
        event.preventDefault();
        const cityValue = document.getElementById('cityInput').value;
        console.log('City:', cityValue);

        //Looks for the searchHistory in local storage and if it doesn't exist, sets it to an empty array
        const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

        //add the cityValue to the searchHistory array
        searchHistory.unshift(cityValue);

        //Save the searchHistory array to local storage
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

        //Call the function to display the search results
        displaySearchResults(searchHistory);

        //Construct the API URL using the cityValue
        const apiKey = "b9021926c89843416e54f049e9cb56a9"
        const cityApiURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityValue}&limit=1&appid=${apiKey}`;

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

                const weatherApiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`;
                fetch(weatherApiURL)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(data) {
                        console.log('Weather Data:', data);

                        // Get the current temperature and the temperature for the next 5 days
                        const currentTemp = (data.list[0].main.temp);
                        const dayTemp1 = (data.list[8].main.temp);
                        const dayTemp2 = (data.list[16].main.temp);
                        const dayTemp3 = (data.list[24].main.temp);
                        const dayTemp4 = (data.list[32].main.temp);
                        const dayTemp5 = (data.list[39].main.temp);

                        // Get the current wind speed and the wind speed for the next 5 days
                        const currentWind = (data.list[0].wind.speed);
                        const dayWind1 = (data.list[8].wind.speed);
                        const dayWind2 = (data.list[16].wind.speed);
                        const dayWind3 = (data.list[24].wind.speed);
                        const dayWind4 = (data.list[32].wind.speed);
                        const dayWind5 = (data.list[39].wind.speed);
                        
                        // Get the current humidity and the humidity for the next 5 days
                        const currentHumidity = (data.list[0].main.humidity);
                        const dayHumidity1 = (data.list[8].main.humidity);
                        const dayHumidity2 = (data.list[16].main.humidity);
                        const dayHumidity3 = (data.list[24].main.humidity);
                        const dayHumidity4 = (data.list[32].main.humidity);
                        const dayHumidity5 = (data.list[39].main.humidity);

                        // Get the current date and the date for the next 5 days
                        const currentDate = (dayjs(data.list[0].dt_txt).format('M/D/YYYY'));
                        const date1 = (dayjs(data.list[8].dt_txt).format('M/D/YYYY'));
                        const date2 = (dayjs(data.list[16].dt_txt).format('M/D/YYYY'));
                        const date3 = (dayjs(data.list[24].dt_txt).format('M/D/YYYY'));
                        const date4 = (dayjs(data.list[32].dt_txt).format('M/D/YYYY'));
                        const date5 = (dayjs(data.list[39].dt_txt).format('M/D/YYYY'));

                        // Get the current weather icon and the weather icon for the next 5 days
                        const currentIcon = (data.list[0].weather[0].icon);
                        const icon1 = (data.list[8].weather[0].icon);
                        const icon2 = (data.list[16].weather[0].icon);
                        const icon3 = (data.list[24].weather[0].icon);
                        const icon4 = (data.list[32].weather[0].icon);
                        const icon5 = (data.list[39].weather[0].icon);
                        
                        // returns the icon URL
                        const currentIconURL = `https://openweathermap.org/img/wn/${currentIcon}.png`;
                        const icon1URL = `https://openweathermap.org/img/wn/${icon1}.png`;
                        const icon2URL = `https://openweathermap.org/img/wn/${icon2}.png`;
                        const icon3URL = `https://openweathermap.org/img/wn/${icon3}.png`;
                        const icon4URL = `https://openweathermap.org/img/wn/${icon4}.png`;
                        const icon5URL = `https://openweathermap.org/img/wn/${icon5}.png`;

                        //render weather data to the page
                        document.getElementById('currentDate').innerText = cityValue + " (" + currentDate + ")";
                        document.getElementById('currentTemp').innerText = "Temp: " + currentTemp + "°F";
                        document.getElementById('currentWind').innerText = "Wind: " + currentWind + " MPH";
                        document.getElementById('currentHumidity').innerText = "Humid: " + currentHumidity + "%";
                        document.getElementById('currentIcon').src = currentIconURL;

                        document.getElementById('date1').innerText = date1;
                        document.getElementById('temp1').innerText = "Temp: " + dayTemp1 + "°F";
                        document.getElementById('wind1').innerText = "Wind: " + dayWind1 + " MPH";
                        document.getElementById('humid1').innerText = "Humid: " + dayHumidity1 + "%";
                        document.getElementById('icon1').src = icon1URL;

                        document.getElementById('date2').innerText = date2;
                        document.getElementById('temp2').innerText = "Temp: " + dayTemp2 + "°F";
                        document.getElementById('wind2').innerText = "Wind: " + dayWind2 + " MPH";
                        document.getElementById('humid2').innerText = "Humid: " + dayHumidity2 + "%";
                        document.getElementById('icon2').src = icon2URL;

                        document.getElementById('date3').innerText = date3;
                        document.getElementById('temp3').innerText = "Temp: " + dayTemp3 + "°F";
                        document.getElementById('wind3').innerText = "Wind: " + dayWind3 + " MPH";
                        document.getElementById('humid3').innerText = "Humid: " + dayHumidity3 + "%";
                        document.getElementById('icon3').src = icon3URL;

                        document.getElementById('date4').innerText = date4;
                        document.getElementById('temp4').innerText = "Temp: " + dayTemp4 + "°F";
                        document.getElementById('wind4').innerText = "Wind: " + dayWind4 + " MPH";
                        document.getElementById('humid4').innerText = "Humid: " + dayHumidity4 + "%";
                        document.getElementById('icon4').src = icon4URL;

                        document.getElementById('date5').innerText = date5;
                        document.getElementById('temp5').innerText = "Temp: " + dayTemp5 + "°F";
                        document.getElementById('wind5').innerText = "Wind: " + dayWind5 + " MPH";
                        document.getElementById('humid5').innerText = "Humid: " + dayHumidity5 + "%";
                        document.getElementById('icon5').src = icon5URL;
                    });
            });
    });

     // Add an event listener to the li button
     const searchResultsContainer = document.getElementById('searchResults');
     searchResultsContainer.addEventListener('click', function(event) {
        event.preventDefault();
        // Check if the clicked element is a list item
        if (event.target.tagName === 'LI') {
            // Get the inner text of the clicked list item
            const listItemText = event.target.innerText;
            console.log('Clicked List Item Text:', listItemText);
            // Set the value of the city input to the clicked list item text
            document.getElementById('cityInput').value = listItemText;

                    //Construct the API URL using the cityValue
        const apiKey = "b9021926c89843416e54f049e9cb56a9"
        const cityApiURL = `https://api.openweathermap.org/geo/1.0/direct?q=${listItemText}&limit=1&appid=${apiKey}`;

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

                const weatherApiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`;
                fetch(weatherApiURL)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(data) {
                        console.log('Weather Data:', data);

                        // Get the current temperature and the temperature for the next 5 days
                        const currentTemp = (data.list[0].main.temp);
                        const dayTemp1 = (data.list[8].main.temp);
                        const dayTemp2 = (data.list[16].main.temp);
                        const dayTemp3 = (data.list[24].main.temp);
                        const dayTemp4 = (data.list[32].main.temp);
                        const dayTemp5 = (data.list[39].main.temp);

                        // Get the current wind speed and the wind speed for the next 5 days
                        const currentWind = (data.list[0].wind.speed);
                        const dayWind1 = (data.list[8].wind.speed);
                        const dayWind2 = (data.list[16].wind.speed);
                        const dayWind3 = (data.list[24].wind.speed);
                        const dayWind4 = (data.list[32].wind.speed);
                        const dayWind5 = (data.list[39].wind.speed);
                        
                        // Get the current humidity and the humidity for the next 5 days
                        const currentHumidity = (data.list[0].main.humidity);
                        const dayHumidity1 = (data.list[8].main.humidity);
                        const dayHumidity2 = (data.list[16].main.humidity);
                        const dayHumidity3 = (data.list[24].main.humidity);
                        const dayHumidity4 = (data.list[32].main.humidity);
                        const dayHumidity5 = (data.list[39].main.humidity);

                        // Get the current date and the date for the next 5 days
                        const currentDate = (dayjs(data.list[0].dt_txt).format('M/D/YYYY'));
                        const date1 = (dayjs(data.list[8].dt_txt).format('M/D/YYYY'));
                        const date2 = (dayjs(data.list[16].dt_txt).format('M/D/YYYY'));
                        const date3 = (dayjs(data.list[24].dt_txt).format('M/D/YYYY'));
                        const date4 = (dayjs(data.list[32].dt_txt).format('M/D/YYYY'));
                        const date5 = (dayjs(data.list[39].dt_txt).format('M/D/YYYY'));

                        // Get the current weather icon and the weather icon for the next 5 days
                        const currentIcon = (data.list[0].weather[0].icon);
                        const icon1 = (data.list[8].weather[0].icon);
                        const icon2 = (data.list[16].weather[0].icon);
                        const icon3 = (data.list[24].weather[0].icon);
                        const icon4 = (data.list[32].weather[0].icon);
                        const icon5 = (data.list[39].weather[0].icon);
                        
                        // returns the icon URL
                        const currentIconURL = `http://openweathermap.org/img/wn/${currentIcon}.png`;
                        const icon1URL = `https://openweathermap.org/img/wn/${icon1}.png`;
                        const icon2URL = `https://openweathermap.org/img/wn/${icon2}.png`;
                        const icon3URL = `https://openweathermap.org/img/wn/${icon3}.png`;
                        const icon4URL = `https://openweathermap.org/img/wn/${icon4}.png`;
                        const icon5URL = `https://openweathermap.org/img/wn/${icon5}.png`;

                        //render weather data to the page
                        document.getElementById('currentDate').innerText = listItemText + " (" + currentDate + ")";
                        document.getElementById('currentTemp').innerText = "Temp: " + currentTemp + "°F";
                        document.getElementById('currentWind').innerText = "Wind: " + currentWind + " MPH";
                        document.getElementById('currentHumidity').innerText = "Humid: " + currentHumidity + "%";
                        document.getElementById('currentIcon').src = currentIconURL;

                        document.getElementById('date1').innerText = date1;
                        document.getElementById('temp1').innerText = "Temp: " + dayTemp1 + "°F";
                        document.getElementById('wind1').innerText = "Wind: " + dayWind1 + " MPH";
                        document.getElementById('humid1').innerText = "Humid: " + dayHumidity1 + "%";
                        document.getElementById('icon1').src = icon1URL;

                        document.getElementById('date2').innerText = date2;
                        document.getElementById('temp2').innerText = "Temp: " + dayTemp2 + "°F";
                        document.getElementById('wind2').innerText = "Wind: " + dayWind2 + " MPH";
                        document.getElementById('humid2').innerText = "Humid: " + dayHumidity2 + "%";
                        document.getElementById('icon2').src = icon2URL;

                        document.getElementById('date3').innerText = date3;
                        document.getElementById('temp3').innerText = "Temp: " + dayTemp3 + "°F";
                        document.getElementById('wind3').innerText = "Wind: " + dayWind3 + " MPH";
                        document.getElementById('humid3').innerText = "Humid: " + dayHumidity3 + "%";
                        document.getElementById('icon3').src = icon3URL;

                        document.getElementById('date4').innerText = date4;
                        document.getElementById('temp4').innerText = "Temp: " + dayTemp4 + "°F";
                        document.getElementById('wind4').innerText = "Wind: " + dayWind4 + " MPH";
                        document.getElementById('humid4').innerText = "Humid: " + dayHumidity4 + "%";
                        document.getElementById('icon4').src = icon4URL;

                        document.getElementById('date5').innerText = date5;
                        document.getElementById('temp5').innerText = "Temp: " + dayTemp5 + "°F";
                        document.getElementById('wind5').innerText = "Wind: " + dayWind5 + " MPH";
                        document.getElementById('humid5').innerText = "Humid: " + dayHumidity5 + "%";
                        document.getElementById('icon5').src = icon5URL;
                    });
            });
        }
    });

    function displaySearchResults(searchHistory) {
        const searchResultsContainer = document.getElementById('searchResults');
        searchResultsContainer.innerHTML = ''; // Clear previous search results
        
        // Check if searchHistory is not null before using it
        if (searchHistory) {
            // Iterate over each city in the search history array
            searchHistory.forEach(function(city) {
                // Create a list item for each city and append it to the search results container
                const listItem = document.createElement('li');
                listItem.className = 'collection-item';
                listItem.textContent = city;
                searchResultsContainer.appendChild(listItem);
            });
        }
    }

    // Call the function to display the search results when the page loads
    displaySearchResults(JSON.parse(localStorage.getItem('searchHistory')));
});

