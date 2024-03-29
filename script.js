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
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${APIkey}`)
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
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`)
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
    const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`
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

    // in progress code to change dates to weekdays 
    // const dateSix = new Date(weatherData.list[5].dt_txt);
    // dateSix.toDateString();
    // console.log(dateSix);
    // var dateString = weatherData.list[5].dt_txt;
    // var date = new Date();
    // var dayOfTheWeek = date.toLocaleString();
    // console.log(dateString);
    // console.log(date);
    // console.log(dayOfTheWeek);

    location.textContent = ("Today's weather for: ") + weatherData.city.name;
    currentTemperature.textContent = ("Current temperature: ") + weatherData.list[0].main.temp + (" °F");
    currentHumidity.textContent = ("Current humidity: ") + weatherData.list[0].main.humidity + ("%");
    currentWindspeed.textContent = ("Current windspeed: ") + weatherData.list[0].wind.speed + (" MPH");

    dateOne.textContent = weatherData.list[5].dt_txt;
    temperatureOne.textContent = ("Average temperature: ") + weatherData.list[5].main.temp + (" °F");
    humidityOne.textContent = ("Average humidity: ") + weatherData.list[5].main.humidity + ("%");
    windspeedOne.textContent = ("Average windspeed: ") + weatherData.list[5].wind.speed + (" MPH");

    dateTwo.textContent = weatherData.list[13].dt_txt;
    temperatureTwo.textContent = ("Average temperature: ") + weatherData.list[13].main.temp + (" °F");
    humidityTwo.textContent = ("Average humidity: ") + weatherData.list[13].main.humidity + ("%");
    windspeedTwo.textContent = ("Average windspeed: ") + weatherData.list[13].wind.speed + (" MPH");

    dateThree.textContent = weatherData.list[21].dt_txt;
    temperatureThree.textContent = ("Average temperature: ") + weatherData.list[21].main.temp + (" °F");
    humidityThree.textContent = ("Average humidity: ") + weatherData.list[21].main.humidity + ("%");
    windspeedThree.textContent = ("Average windspeed: ") + weatherData.list[21].wind.speed + (" MPH");

    dateFour.textContent = weatherData.list[29].dt_txt;
    temperatureFour.textContent = ("Average temperature: ") + weatherData.list[29].main.temp + (" °F");
    humidityFour.textContent = ("Average humidity: ") + weatherData.list[29].main.humidity + ("%");
    windspeedFour.textContent = ("Average windspeed: ") + weatherData.list[29].wind.speed + (" MPH");

    dateFive.textContent = weatherData.list[37].dt_txt;
    temperatureFive.textContent = ("Average temperature: ") + weatherData.list[37].main.temp + (" °F");
    humidityFive.textContent = ("Average humidity: ") + weatherData.list[37].main.humidity + ("%");
    windspeedFive.textContent = ("Averagea windspeed: ") + weatherData.list[37].wind.speed + (" MPH");
}


const searchBtn = document.querySelector("#search-btn");
const searchBar = document.querySelector("#search-bar");

searchBtn.addEventListener("click", () => {
    const location = searchBar.value;
    getLocation(location)
});
