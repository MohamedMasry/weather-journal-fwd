// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 8080;

//Spin up the server
const server = app.listen(port, listening);

// Callback to debug
function listening() {
    console.log('El Server Sh8al');
    console.log(`On localhost: ${port}`);
};

//GET route that returns the projectData object
app.get('/all', sendData)

function sendData(request, response) {
    response.send(projectData)
}

// POST route
app.post('/addWeatherData', addData)

function addData(request, response) {
    projectData.temp = request.body.temp;
    projectData.date = request.body.date;
    projectData.feelings = request.body.feelings;
    response.send({ msg: "Post Received Successfully" });
    console.log(projectData)
}