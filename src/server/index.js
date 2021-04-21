
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

/* Start up an instance of app */
const app = express()

const dotenv = require('dotenv');
dotenv.config();

/* Dependencies */

const path = require('path')
const bodyParser = require('body-parser')
const querystring = require('querystring');
const fetch = require('node-fetch')
const cors = require('cors');

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('dist'))

// const port = 8081

console.log(JSON.stringify(mockAPIResponse))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
})

app.get('/test', function (req, res) {
    res.json(mockAPIResponse);
})


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();


async function getPlaceDetails(placename, country){
    // API document: https://www.geonames.org/export/web-services.html
    try{

        const protocol = 'http'
        let geoNamesUrl = 'api.geonames.org/postalCodeLookupJSON';

        const params = {
            placename: `${placename}`,
            country: `${country}`,
            username: `${process.env.GEONAMES_API_KEY}`,
        }

        let options = {
            method: 'GET',
        };

        const apiQuery = `${protocol}://${geoNamesUrl}?${querystring.stringify(params)}`
        console.log(apiQuery)
        const result = await fetch(apiQuery, options)
        const resultJson = await result.json();
        return resultJson

    } catch(error) {
        throw(error)
    }
}

// Requirements: If the trip is in the future, you will get a predicted forecast.
async function getHistoricalWeather(lat, lon, startDate, endDate ){
    try{
        const protocol = 'https'
        let weatherBitUrl = 'api.weatherbit.io/v2.0/history/daily';
        const params = {
            lat: `${lat}`,
            lon: `${lon}`,
            start_date: `${startDate}`,
            end_date: `${endDate}`,
            key: `${process.env.WEATHERBIT_API_KEY}`,
        }

        let options = {
            method: 'GET',
        };

        const apiQuery = `${protocol}://${weatherBitUrl}?${querystring.stringify(params)}`
        console.log(apiQuery)
        const result = await fetch(apiQuery, options)
        const resultJson = await result.json();
        return resultJson
    }
    catch (error) {
        throw(error)
    }
}


//Requirements: If the trip is within a week, you will get the current weather forecast
async function getSixteenDayForecast(lat, lon, days){
    try{
        const protocol = 'https'
        let weatherBitUrl = 'api.weatherbit.io/v2.0/forecast/daily';
        // TODO Create check so that the lat and lon only have 3 decimals otherwise the call will fail
        const params = {
            lat: `${lat}`,
            lon: `${lon}`,
            days: `${days}`,
            key: `${process.env.WEATHERBIT_API_KEY}`,
        }

        let options = {
            method: 'GET',
        };

        const apiQuery = `${protocol}://${weatherBitUrl}?${querystring.stringify(params)}`
        console.log(apiQuery)
        const result = await fetch(apiQuery, options)
        const resultJson = await result.json();
        return resultJson
    }
    catch (error) {
        throw(error)
    }
}

// What information are you going to submit to the API to achieve an appropriate image? What if there are no results?
// What Parameters will you want to set to pull in images?
// How will you submit your data from the location field to a Pixabay URL parameter without having spaces in the url?
async function getRelatedImage(city){
    try{
        const protocol = 'https'
        let pixabayUrl = 'pixabay.com/api/';
        // TODO Create check  latitude, longitude, country
        const params = {
            key: `${process.env.PIXABAY_API_KEY}`,
            q: `${city}`,
            order: 'popular',
            image_type: 'photo'
        }

        let options = {
            method: 'GET',
        };

        const apiQuery = `${protocol}://${pixabayUrl}?${querystring.stringify(params)}`
        console.log(apiQuery)
        const result = await fetch(apiQuery, options)
        const resultJson = await result.json();
        return resultJson
    }
    catch (error) {
        throw(error)
    }
}



app.post('/tripData', async(req, res) => {
    try {
        let tripData = {}
        const body = req.body
        // DEBUG
        // console.log(`req BODY: ${JSON.stringify(body)}`)
        const city = body.city
        const country = body.country
        // DEBUG
        // console.log(`req Body City: ${JSON.stringify(city)}`)
        // console.log(`req Body Country: ${JSON.stringify(country)}`)

        // :::::::::::::::::::::::::::::::::::::::::::
        const placeDetails = await getPlaceDetails(city, country)

        tripData["city"] = city
        tripData["country"] = country
        tripData["lat"] = placeDetails.postalcodes[0].lat
        tripData["lon"] = placeDetails.postalcodes[0].lng

        // :::::::::::::::::::::::::::::::::::::::::::
        const sixteenDayForecast = await getSixteenDayForecast(tripData.lat, tripData.lon, 2)
        // get16DayForecast("43.651", "-79.347", "1").then(r => console.log(r))

        let weatherForecasts = []
        for (i in sixteenDayForecast.data) {
            const day = {};
            day["validDate"] = sixteenDayForecast.data[i].valid_date;
            day["maxTemp"] = sixteenDayForecast.data[i].max_temp;
            day["lowTemp"] = sixteenDayForecast.data[i].low_temp;
            day["description"] = sixteenDayForecast.data[i].weather.description
            weatherForecasts.push(day)
            }
        tripData["weatherForecasts"] = weatherForecasts

        // :::::::::::::::::::::::::::::::::::::::::::
        const destinationImage = await getRelatedImage(city)
        const cityImg = destinationImage.hits[0].webformatURL
        tripData["cityImg"] = cityImg

        // :::::::::::::::::::::::::::::::::::::::::::
        let descriptionImages = {};
        for (let i in tripData.weatherForecasts) {
            let description = tripData.weatherForecasts[i].description
            const relatedImage = await getRelatedImage(description)

            // TODO: if has key hits
            const weatherDescriptionImg = relatedImage.hits.webformatURL;
            descriptionImages[description] = weatherDescriptionImg

            // TODO: else
            // descriptionImages[description] = 'N/A PLACEHOLDER'
        }
        tripData["descriptionImages"] = descriptionImages

        // console.log("LOG descriptionImages OBJECT")
        // console.log(descriptionImages)
        console.log("LOG tripData.descriptionImages OBJECT ")
        console.log(tripData["descriptionImages"])

        // :::::::::::::::::::::::::::::::::::::::::::
        res.json(tripData)
        // console.log(tripData)
        console.log('COMPLETED FETCH')

    } catch (error) {
        console.log(error)
    }
})




let port = process.env.PORT;
if (port == null || port == "") {
    port = 8081;
}
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// getPlaceDetails("Toronto", "CA").then(r => console.log(r))


// get16DayForecast("43.651", "-79.347", "1").then(r => console.log(r))
// getHistoricalWeather("43.651", "-79.347", '2021-04-09', '2021-04-10').then(r => console.log(r))
// getRelatedImage('Toronto').then(r => console.log(r))
// console.log('test')


// console.log(`Your API key is ${process.env.API_KEY}`);
