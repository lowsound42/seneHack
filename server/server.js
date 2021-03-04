const express = require('express');
const app = express();
const port = process.env.PORT || 8042;
const axios = require('axios');
const bodyParser = require('body-parser');
var cors = require('cors');
var gpio = require('onoff').Gpio;
var pir = new gpio(7, 'in', 'both');
const fs = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

const serviceAccount = require('./senehack-b562e-firebase-adminsdk-yvjli-debfac8371.json');

fs.initializeApp({
    credential: fs.credential.cert(serviceAccount)
});

const db = fs.firestore();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.get('/', (req, res) => {
    res.send("I'M ALIVE!");
    console.log('something happened');
});

app.post('/feed', async (req, res) => {
    const coloursRef = db.collection('colours');
    const snapshot = await coloursRef
        .where('colour', '==', req.body.colour)
        .get();
    if (snapshot.empty) {
        console.log('No matching documents.');
        return;
    }
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
    });
    res.send('Looking for data');
});

app.get('/feed', async (req, res) => {
    var data = [];
    const coloursRef = db.collection('colours');
    const snapshot = await coloursRef
        .where('colour', 'in', ['red', 'green', 'blue'])
        .get();
    if (snapshot.empty) {
        console.log('No matching documents.');
        return;
    }
    snapshot.forEach((doc) => {
        data.push(doc.data());
        console.log(doc.id, '=>', doc.data());
    });
    res.send(data);
});

pir.watch(function (err, value) {
    if (err) console.log(err);
    if (value === 1) {
        axios.put(
            'http://192.168.0.106/api/Kh4lvPekMerBQslndYvx0Z2Lwh-ITbOwNBK8yYjP/lights/3/state',
            {
                on: true,
                hue: 21845
            }
        );

        setTimeout(function () {
            axios.put(
                'http://192.168.0.106/api/Kh4lvPekMerBQslndYvx0Z2Lwh-ITbOwNBK8yYjP/lights/3/state',
                {
                    on: true,
                    hue: 8597
                }
            );
        }, 2000);

        console.log(value);
    }
});

const coloursDb = db.collection('colours');

app.post('/light', (request, res) => {
    var colour = request.body.text;
    console.log('User Requested Colour: ', colour);
    switch (colour) {
        case (colour = 'green'):
            axios.put(
                'http://192.168.0.106/api/Kh4lvPekMerBQslndYvx0Z2Lwh-ITbOwNBK8yYjP/lights/3/state',
                {
                    on: true,
                    hue: 21845
                }
            );
            break;
        case (colour = 'red'):
            axios.put(
                'http://192.168.0.106/api/Kh4lvPekMerBQslndYvx0Z2Lwh-ITbOwNBK8yYjP/lights/3/state',
                {
                    on: true,
                    hue: 65535
                }
            );
            break;
        case (colour = 'blue'):
            axios.put(
                'http://192.168.0.106/api/Kh4lvPekMerBQslndYvx0Z2Lwh-ITbOwNBK8yYjP/lights/3/state',
                {
                    on: true,
                    hue: 43690
                }
            );
            break;
        case (colour = 'reset'):
            axios.put(
                'http://192.168.0.106/api/Kh4lvPekMerBQslndYvx0Z2Lwh-ITbOwNBK8yYjP/lights/3/state',
                {
                    on: true,
                    hue: 8597
                }
            );
            break;
        case (thing = 'off'):
            axios.put(
                'http://192.168.0.106/api/Kh4lvPekMerBQslndYvx0Z2Lwh-ITbOwNBK8yYjP/lights/3/state',
                {
                    on: false
                }
            );
            break;
        default:
            axios.put(
                'http://192.168.0.106/api/Kh4lvPekMerBQslndYvx0Z2Lwh-ITbOwNBK8yYjP/lights/3/state',
                {
                    on: true,
                    hue: 8597
                }
            );
    }
    coloursDb.doc(uuidv4()).set({
        colour: colour,
        date: new Date()
    });
    res.send({ message: "You're messing with my lights" });
});

app.listen(port, () => {
    console.log(`Greetings Commander, we're on port ${port}`);
});
