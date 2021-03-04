var feed = document.getElementById('feed');
feed.innerHTML = ' ';

function loadScreen() {
    setTimeout(function () {
        document.body.className = ' ';
        let splash = document.getElementById('splashScreen');
        let main = document.getElementById('postSplash');
        splash.classList.add('invisible');
        main.classList.remove('invisible');
        getFeed();
    }, 2000);
}

function changeLight(colour) {
    const data = {};
    data.text = colour;
    document.body.className = colour;
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
        .then(getFeed())
        .catch((error) => {
            console.error(error);
        });
}

function renderData(data) {
    const characters = [
        'panda',
        'ostrich',
        'armadillo',
        'wolverine',
        'koala',
        'grasshopper',
        'shrimp'
    ];

    feed.innerHTML = ' ';
    data.forEach((element) => {
        var character =
            characters[Math.floor(Math.random() * characters.length)];
        var emotion = '';
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(element.date._seconds);
        let tempDiv = document.createElement('div');
        tempDiv.classList.add('feedCard');
        if (element.colour == 'green') {
            tempDiv.classList.add('greenSmall');
            emotion = 'missed you';
        } else if (element.colour == 'red') {
            tempDiv.classList.add('redSmall');
            emotion = "couldn't sleep";
        } else {
            tempDiv.classList.add('blueSmall');
            emotion = 'was excited!';
        }
        let colourPara = document.createElement('p');
        let datePara = document.createElement('p');
        let colourText = document.createTextNode(
            'Anonymous ' + character + '\n' + emotion
        );
        let dateText = document.createTextNode(`date: ${d}`);
        colourPara.classList.add('paraStyle');
        colourPara.appendChild(colourText);
        tempDiv.appendChild(colourPara);
        feed.appendChild(tempDiv);
    });
}

function getFeed() {
    console.log('HERE');
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
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span> | ${weather.description}`;
    //weatherDescElement.innerHTML = weather.description;
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
