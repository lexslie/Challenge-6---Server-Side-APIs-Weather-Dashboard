// var weatherAPIKey = "1315bf372e314ca89e141b1ab0e182ba";
// var city;
// var weatherqueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
// var weatherFormEl = document.querySelector("#weather-form");

function getWeatherData(location) {
    const apiKey = "1315bf372e314ca89e141b1ab0e182ba";
    const url = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}"
    return fetch(url)
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