//test for git hub 

function changeLight(colour) {
    const data = {};
    data.text = colour;
    fetch('http://24.212.130.181:8042/light', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json()) //parse JSON into object
        .then(data => {
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
    unit: "celsius"
}
const key = "48c7cf84c45dc694e28933f6b91317b9";
const tempElement = document.getElementById('temperature');
const weatherDescElement = document.getElementById('weather-desc');
const locationElement = document.getElementById('location');

function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    //console.log(api); //min/max/feel-like temp, sunrise, sunset, location... 
    fetch(api)
        .then(response => response.json())
        .then(data => {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].main;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            // console.log(weather.temperature.value);
            // console.log(weather.description);
            // console.log(weather.city);
        })
        .then(() => {
            displayWeahter();
        })
}

function displayWeahter() {
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span> | ${weather.description}`;
    //weatherDescElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>";
}

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

function showError(error) {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = "<p> ${error.message} </p>";
}


//Canlendar info
const { google } = require('googleapis')
const { OAuth2 } = google.auth
const oAuth2Client = new OAuth2('319708594453-5m7gsnh763q1813ht3qeg0ihqoit7uc6.apps.googleusercontent.com', 'GngKMQbEMiRLrvwtdxP4uxaj')
oAuth2Client.setCredentials({ refresh_token: 'xxxxx' }) //Get the token later

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

const eventStartTime = new Date();
eventStartTime.setDate(eventStartTime.getDay() + 2);
const eventEndTime = new Date();
eventEndTime.setDate(eventEndTime.getDay() + 365);

const event = {
    summary: 'Medication',
    description: '2 aaa pill, a bbb pill',
    start: {
        dateTime: eventStartTime, //change to regular schedule
        timeZone: -18000
    },
    end: {
        dateTime: eventEndTime,
        timeZone: -18000
    },
    colorId: 1,

}