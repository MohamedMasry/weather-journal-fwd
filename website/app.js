/* Global Variables */

let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let key = '&appid=90ab013ca1d9d873dc5eb117f441fa7f&units=metric';


const entryVisble = document.querySelectorAll('#entryHolder');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const postCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    console.log(newDate);
    getTemperature(baseURL, postCode, key)
        .then(function(data) {
            // Add data to POST request
            postData('/addWeatherData', { temp: data.main.temp, date: newDate, feelings: content })
                // Updating UI
                .then(function() {
                    updateUI()
                })

        })
}

// Async GET
const getTemperature = async(baseURL, zip, key) => {
    // const getTemperatureDemo = async (url)=>{
    const response = await fetch(baseURL + zip + key)
    console.log(response);
    try {
        const data = await response.json();
        console.log(data);
        console.log('first');
        return data;
    } catch (error) {
        console.log('error', error);
    }
}

// Async POST
const postData = async(url = '', data = {}) => {
    const postReq = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        console.log('second');
        const newData = await postReq.json();
        console.log(newData, 'continue second');
        return newData;
    } catch (error) {
        console.log('Error', error);
    }
}

// Update user interface
const updateUI = async() => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log('third');
        // show entry 
        entryVisble.forEach(entryv => entryv.style.opacity = '1');
        // update new entry values
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp + '°C';
        document.getElementById('content').innerHTML = allData.feelings;
    } catch (error) {
        console.log('error', error);
    }
}