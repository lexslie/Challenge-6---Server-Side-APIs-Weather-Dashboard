var weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`
var APIkey = `1315bf372e314ca89e141b1ab0e182ba`;
var name;
var cityName;
var lon;
var lat;
var searchLocation;
var eventResult;

var userLocation = ('#search-bar');
var localWeather = ('.local-weather')


function getLocation(cityName){
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${APIkey}`)
        // get city's longitude and latitude
        .then(Response => Response.json())
        .then(data => {
            console.log(data)
            cityName = data[0].name;
            lat = data[0].lat;
            lon = data[0].lon;
            getWeatherData(name, lat, lon);
            getCurrentWeather(name, lat, lon);
        })
};
    

function getForecast() {
    localStorage.setItem('userLon', eventResult.center[0]);
    localStorage.setItem('userLat', eventResult.center[1]);
    localStorage.setItem('userLocation', searchLocation);
    window.location.href = './forecast.html';
};

function getWeather(lon, lat){  
    fetch(weatherURL + 'lat=' + lat + '&lon=' + lon + "&units=imperial&" + APIkey)  // takes longitude and latitude data from the city search to call the weather API
      .then(function (response) {
      return response.json();
    })
};

// current weather API
function getCurrentWeather(location, lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`)
     .then(Response => Response.json())
     .then(data => {
        console.log(data);
        const currentWeather = {
            weather: data.main,
            condition: data.weather,
            location: data.name,
        };
        return currentWeather;
     });
};


// // Grabs the searched location and spits out longitude/latitude
// function parseLocation(result) {
//     lon = result.center[0];
//     lat = result.center[1];
//     placeEL.text("Weather for " + result.place_name);
//     weatherContainer.attr('class', 'row');
//     getWeather(lon, lat);
// }


function getWeatherData(location, lat, lon) {
    const APIkey = "1315bf372e314ca89e141b1ab0e182ba";
    const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`)
        .then(Response => Response.json())
        .then(data => {
            console.log(data);
            const weatherData = {
                temperature: data.main,
                condition: data.weather,
                location: data.name,
            };
            return weatherData;
        });
};

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
    getLocation(location)
    // getWeatherData(location)
    //     .then(weatherData => {
    //         updateUI(weatherData);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
});
