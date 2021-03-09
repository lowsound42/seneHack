var feed = document.getElementById('feed');
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
        let hours = d.getHours();
        let minutes = d.getMinutes();
        let seconds = d.getSeconds();
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        console.log(minutes);
        let dateText = document.createTextNode(
            `${d.getDate()}/${
                d.getMonth() + 1
            }/${d.getFullYear()} ${hours}:${minutes}:${seconds}`
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
