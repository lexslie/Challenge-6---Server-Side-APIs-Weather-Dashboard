// var weatherAPIKey = "1315bf372e314ca89e141b1ab0e182ba";
// var city;
// var weatherqueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
// var weatherFormEl = document.querySelector("#weather-form");

var weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`
var APIkey = `1315bf372e314ca89e141b1ab0e182ba`;
var lon;
var lat;
var searchLocation;
var eventResult;

var userLocation = ('#search-bar');
var localWeather = ('.local-weather')


function getLocation(cityName){
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit={limit}&appid=${APIkey}`)
        .then(function(response) {
        // get city's longitude and latitude
            var name = Response.cityName;
            var lat = Response.coord.lat;
            var lon = Response.coord.lon;
        })
};
    

// function getForecast() {
//     localStorage.setItem('userLon', eventResult.center[0]);
//     localStorage.setItem('userLat', eventResult.center[1]);
//     localStorage.setItem('userLocation', searchLocation);
//     window.location.href = './forecast.html';
// };

function getWeather(lon, lat){  
    fetch(weatherURL + 'lat=' + lat + '&lon=' + lon + "&units=imperial&" + APIkey)  // takes longitude and latitude data from the city search to call the weather API
      .then(function (response) {
      return response.json();
    })
};



// // Grabs the searched location and spits out longitude/latitude
// function parseLocation(result) {
//     lon = result.center[0];
//     lat = result.center[1];
//     placeEL.text("Weather for " + result.place_name);
//     weatherContainer.attr('class', 'row');
//     getWeather(lon, lat);
// }


function getWeatherData(location) {
    const APIkey = "1315bf372e314ca89e141b1ab0e182ba";
    const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`
    return fetch(weatherURL)
        .then(Response => Response.json())
        .then(data => {
            const weatherData = {
                temperature: data.main.temp,
                condition: data.weather[0].main,
                location: data.name,
            };
            return weatherData;
        });
}

function updateUI(weatherData) {
    const temperature = document.querySelector("#temperature");
    const condition = document.querySelector("#condition");
    const location = document.querySelector("#location");

    temperature.textContent = '${weatherData.temperature}°C';
    condition.textContent = weatherData.condition;
    location.textContent = weatherData.location;
}

const searchBtn = document.querySelector("#search-btn");
const searchBar = document.querySelector("#search-bar");

searchBtn.addEventListener("click", () => {
    const location = searchBar.value;
    getWeatherData(location)
        .then(weatherData => {
            updateUI(weatherData);
        })
        .catch(error => {
            console.log(error);
        });
});
