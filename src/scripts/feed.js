var feed = document.getElementById('feed');
var url = '';
if (window.location.href == 'http://127.0.0.1:5500/feed.html') {
    url = 'http://24.212.130.181:8042/';
    console.log();
} else {
    url = '/';
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
            emotion = 'Missed you';
        } else if (element.colour == 'red') {
            tempDiv.classList.add('redSmall');
            emotion = "Couldn't sleep";
        } else {
            tempDiv.classList.add('blueSmall');
            emotion = 'Was excited!';
        }
        let personPara = document.createElement('p');
        let emotionPara = document.createElement('p');
        let datePara = document.createElement('p');
        let personText = document.createTextNode(
            'Anonymous ' + character + '\n'
        );
        let emotionText = document.createTextNode(emotion);
        let dateText = document.createTextNode(
            `${d.getDate()}/${
                d.getMonth() + 1
            }/${d.getFullYear()} ${d.getUTCHours()}:${d.getUTCMinutes()}:${d.getUTCSeconds()}`
        );
        personPara.classList.add('feedPerson');
        emotionPara.classList.add('feedEmotion');
        datePara.classList.add('feedDate');
        personPara.appendChild(personText);
        emotionPara.appendChild(emotionText);
        datePara.appendChild(dateText);
        tempDiv.appendChild(personPara);
        tempDiv.appendChild(emotionPara);
        tempDiv.appendChild(datePara);
        feed.appendChild(tempDiv);
    });
}

function getFeed() {
    console.log('HERE');
    fetch(`${url}feed`, {
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

window.onload = getFeed;
