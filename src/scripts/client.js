function loadScreen() {
    setTimeout(function () {
        document.body.className = ' ';
        let splash = document.getElementById('splashScreen');
        let main = document.getElementById('postSplash');
        splash.classList.add('invisible');
        main.classList.remove('invisible');
    }, 2000);
}

function changeLight(colour) {
    const data = {};
    data.text = colour;
    document.body.className = colour;
    let veronica = document.getElementById('veronica');
    veronica.classList.remove('invisible');
    fetch(`${url}light`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json()) //parse JSON into object
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error(error);
        });
}

//a way to change light behavior, not just color (effect, transitiontime, alert)

//time info
function getTime() {
    let tempTime = new Date();
    let hour = tempTime.getHours();
    let min = tempTime.getMinutes();
    if (min < 10) {
        min = '0' + min;
    }
    if (hour < 12) {
        return `${hour}:${min} am`;
    } else if (hour >= 12) {
        return `${hour}:${min} pm`;
    }
}

function displayTime() {
    const timeElement = document.getElementById('time');
    timeElement.innerHTML = getTime();
}
displayTime();

//Weather info
const KELVIN = 273;
let weather = {};
weather.temperature = {
    unit: 'celsius'
};
const key = '48c7cf84c45dc694e28933f6b91317b9';
const tempElement = document.getElementById('temperature');
const weatherDescElement = document.getElementById('weather-desc');
const locationElement = document.getElementById('location');
function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api)
        .then((response) => response.json())
        .then((data) => {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].main;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(() => {
            displayWeahter();
        });
}

function displayWeahter() {
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span> | ${weather.description}`;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML =
        "<p>Browser doesn't support Geolocation</p>";
}

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

function showError(error) {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = '<p> ${error.message} </p>';
}

window.onload = function () {
    loadScreen();
};
//tempElement.innerHTML = `${weather.temperature.value} degree <span>C</span>`;
