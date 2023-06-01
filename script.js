var weatherAPIKey = "1315bf372e314ca89e141b1ab0e182ba";
var city;
// var weatherqueryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
var weatherFormEl = document.querySelector("#weather-form");
var languageButtonsEl = document.querySelector("#language-buttons");
var nameInputEl = document.querySelector("#city");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function (event) {
    event.preventDefault();

    var city = nameInputEl.ariaValueMax;

    if (city) {
        getWeather(city);

        repoContainerEl.textContent = "";
        nameInputEl.value = "";
    } else {
        alert("Please enter a city");
    }
};

var buttonClickHandler = function (event) {
    var language = event.target.getAtrribute("data-language");

    if (language) {
        getFeatureRepos(language);

        repoContainerEl.textContent = "";
    }
};

var getWeather = function (weather) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + weatherAPIKey;

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayRepos(data.items, language);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};

var displayRepos = function (repos, searchTerm) {
    if(repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

    repoSearchTerm.textContent = searchTerm;

    for (var i = 0; i < repos.length; i++) {
        var repoName = repos[i].owner.login + '/' + repos[i].name;

        var repoEl = document.createElement('div');
        repoEl.classList = "list-item flex row justify-space-between align-center";

        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        repoEl.appendChild(titleEl);

        var statusEl = document.createElement("span");
        statusEl.classList = 'flex-row align-center';

        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
            "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        repoEl.appendChild(statusEl);

        repoContainerEl.appendChild(repoEl);
    }
};

userFormEl.addEventListener('submit', formSubmitHandler);
languageButtonsEl.addEventListener('click', buttonClickHandler);
