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
            console.log("this is getLocation", data)
            lat = data[0].lat;
            lon = data[0].lon;
            getWeatherData(lat, lon);
            getCurrentWeather(lat, lon);
        })
};
    

function getForecast() {
    localStorage.setItem('userLon', eventResult.center[0]);
    localStorage.setItem('userLat', eventResult.center[1]);
    localStorage.setItem('userLocation', searchLocation);
    window.location.href = './forecast.html';
};


// Current weather API
function getCurrentWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`)
     .then(Response => Response.json())
     .then(data => {
        console.log("this is getCurrentWeather", data);
        const currentWeather = {
            weather: data.main,
            condition: data.weather,
            location: data.name,
        };
        return currentWeather;
     });
};


function getWeatherData(lat, lon) {
    const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`
    return fetch(weatherURL)
        .then(Response => Response.json())
        .then(data => {
            console.log("this is getWeatherData", data);
            console.log(data.list[0].main.humidity);
            updateUI(data);
        });
};

// Displaying data
function updateUI(weatherData) {
    const temperature = document.querySelector("#temperature");
    const humidity = document.querySelector("#humidity");
    const windspeed = document.querySelector("#windspeed");
    const location = document.querySelector("#location");

    location.textContent = ("Today's weather for: ") + weatherData.city.name;
    temperature.textContent = ("Current temperature: ") + weatherData.list[0].main.temp;
    humidity.textContent = ("Current humidity: ") + weatherData.list[0].main.humidity;
    windspeed.textContent = ("Current windspeed: ") + weatherData.list[0].wind.speed;
}


const searchBtn = document.querySelector("#search-btn");
const searchBar = document.querySelector("#search-bar");

searchBtn.addEventListener("click", () => {
    const location = searchBar.value;
    getLocation(location)
});
