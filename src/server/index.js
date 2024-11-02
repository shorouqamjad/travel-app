const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

// Initialize environment variables
dotenv.config();

const app = express();

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.static('dist'));
app.use(cors());

// Assign environment variables to constants
const geonamesUsername = process.env.GEONAMES_USERNAME || 'shorouqamjad';  // Fall back to 'shorouqamjad' if not in .env
const weatherbitApiKey = process.env.WEATHERBIT_KEY;
const pixabayApiKey = process.env.PIXABAY_KEY;

// Log the API keys to verify
console.log(`Geonames Username: ${geonamesUsername}`);
console.log(`Weatherbit API Key: ${weatherbitApiKey}`);
console.log(`Pixabay API Key: ${pixabayApiKey}`);

// Endpoint to expose API keys
app.get('/apiKeys', (req, res) => {
    res.json({
        geonamesUsername,
        weatherbitApiKey,
        pixabayApiKey
    });
});

// Serve index.html from the dist folder
app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log(`Server is running on port ${port}`);
});