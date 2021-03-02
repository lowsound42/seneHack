//hello Omar
//
function missYou() {
    const data = {
        text: 'red'
    };

    fetch('http://24.212.130.181:8042/light', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error(error);
        });
}
