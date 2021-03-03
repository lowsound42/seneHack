function missYou() {
    const data = {
        text: 'green'
    };
    document.body.style.backgroundColor = 'green';

    fetch('/light', {
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

function beingSleepless() {
    const data = {
        text: 'red'
    };

    document.body.style.backgroundColor = 'red';

    fetch('/light', {
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

function excited() {
    document.body.style.backgroundColor = 'blue';

    const data = {
        text: 'blue'
    };
    fetch('/light', {
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

function renderData(data) {
    var feed = document.getElementById('feed');
    data.forEach((element) => {
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(data.date._seconds);
        let tempDiv = document.createElement('div');
        let text = document.createTextNode(
            `colour: ${element.colour}, date: ${d}`
        );
        tempDiv.appendChild(text);
        feed.appendChild(tempDiv);
    });
}

function getFeed() {
    fetch('/feed', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json()) //parse JSON into object
        .then((data) => {
            renderData(data);
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error(error);
        });
}

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
    console.log(api); //min/max/feel-like temp, sunrise, sunset, location...
    fetch(api)
        .then((response) => response.json())
        .then((data) => {
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
        });
}

function displayWeahter() {
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    weatherDescElement.innerHTML = weather.description;
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

window.onload = getFeed;
//tempElement.innerHTML = `${weather.temperature.value} degree <span>C</span>`;
