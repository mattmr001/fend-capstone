
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

/* Start up an instance of index */
const index = express()

const dotenv = require('dotenv')
dotenv.config()

/* Dependencies */
// const bodyParser = require('body-parser')
const querystring = require('querystring')
const fetch = require('node-fetch')
const cors = require('cors')

/* Middleware */
index.use(express.json())
index.use(cors())

/* Initialize the main project folder */
index.use(express.static('dist'))

// const port = 8081

/* Local Modules */
// TODO: figure out how create modules and import them

index.get('/', function (req, res) {
  res.sendFile('dist/index.html')
})

index.get('/test', function (req, res) {
  res.json(mockAPIResponse)
})

// :::::::::::::::::::::::::::::::::::::::::::
// TODO: Create module for the functions below fetching api data
// :::::::::::::::::::::::::::::::::::::::::::

async function getPlaceDetails (placename, country) {
  // API document: https://www.geonames.org/export/web-services.html
  // eslint-disable-next-line no-useless-catch
  try {
    const protocol = 'http'
    const geoNamesUrl = 'api.geonames.org/postalCodeLookupJSON'

    const params = {
      placename: `${placename}`,
      country: `${country}`,
      username: `${process.env.GEONAMES_API_KEY}`
    }

    const options = {
      method: 'GET'
    }

    const apiQuery = `${protocol}://${geoNamesUrl}?${querystring.stringify(params)}`
    // DEBUG:
    // console.log(apiQuery)
    const result = await fetch(apiQuery, options)
    const resultJson = await result.json()
    return resultJson
  } catch (error) {
    throw (error)
  }
}

async function getWeatherNorms (lat, lon, startDate, endDate) {
  // eslint-disable-next-line no-useless-catch
  try {
    const protocol = 'https'
    const weatherBitUrl = 'api.weatherbit.io/v2.0/normals'

    const formattedStartDate = startDate.slice(5)
    const formattedEndDate = endDate.slice(5)

    const params = {
      lat: `${lat}`,
      lon: `${lon}`,
      start_day: `${formattedStartDate}`,
      end_day: `${formattedEndDate}`,
      key: `${process.env.WEATHERBIT_API_KEY}`
    }

    const options = {
      method: 'GET',
      origin: ['http://localhost:8081', 'https://calm-refuge-82542.herokuapp.com'],
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const apiQuery = `${protocol}://${weatherBitUrl}?${querystring.stringify(params)}`
    // DEBUG:
    // console.log(apiQuery)
    const result = await fetch(apiQuery, options)
    const resultJson = await result.json()
    return resultJson
  } catch (error) {
    throw (error)
  }
}

// Requirements: If the trip is within a week, you will get the current weather forecast
async function getSixteenDayForecast (lat, lon, days) {
  // eslint-disable-next-line no-useless-catch
  try {
    const protocol = 'https'
    const weatherBitUrl = 'api.weatherbit.io/v2.0/forecast/daily'
    const params = {
      lat: `${lat}`,
      lon: `${lon}`,
      days: `${days}`,
      key: `${process.env.WEATHERBIT_API_KEY}`
    }

    const options = {
      method: 'GET',
      origin: ['http://localhost:8081', 'https://calm-refuge-82542.herokuapp.com'],
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const apiQuery = `${protocol}://${weatherBitUrl}?${querystring.stringify(params)}`
    // DEBUG:
    // console.log(apiQuery)
    const result = await fetch(apiQuery, options)
    const resultJson = await result.json()
    return resultJson
  } catch (error) {
    throw (error)
  }
}

async function getRelatedImage (city) {
  // eslint-disable-next-line no-useless-catch
  try {
    const protocol = 'https'
    const pixabayUrl = 'pixabay.com/api/'
    const params = {
      key: `${process.env.PIXABAY_API_KEY}`,
      q: `${city}`,
      order: 'popular',
      image_type: 'photo'
    }

    const options = {
      method: 'GET',
      origin: ['http://localhost:8081', 'https://calm-refuge-82542.herokuapp.com'],
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const apiQuery = `${protocol}://${pixabayUrl}?${querystring.stringify(params)}`
    // DEBUG:
    // console.log(apiQuery)
    const result = await fetch(apiQuery, options)
    const resultJson = await result.json()
    return resultJson
  } catch (error) {
    throw (error)
  }
}

// :::::::::::::::::::::::::::::::::::::::::::
// TODO: Create a module for the functions below. These functions help us build properties for our tripData object( whats a good name for a module name for this?)
// :::::::::::::::::::::::::::::::::::::::::::
function buildListFromObjectAttribute (obj, dataKey) {
  const attributeList = []
  for (const i in obj) {
    const value = obj[i][dataKey]
    attributeList.push(value)
  }
  return attributeList
}

function calculateAverageTemperatures (list) {
  let theCount = 0
  let sum = 0
  for (const i in list) {
    theCount += 1
    sum += list[i]
  }
  const averageTemperature = sum / theCount
  const averageTemperatureRounded = Math.round(averageTemperature * 10) / 10
  return averageTemperatureRounded
}

function buildAverageTemp (apiFetch, tripData) {
  const tempList = buildListFromObjectAttribute(apiFetch, 'temp')
  const averageTemperature = calculateAverageTemperatures(tempList)
  tripData.averageTemp = averageTemperature
}

function buildAverageMaxTemp (apiFetch, tripData) {
  const maxTempList = buildListFromObjectAttribute(apiFetch, 'max_temp')
  const averageMaxTemperature = calculateAverageTemperatures(maxTempList)
  tripData.averageMaxTemp = averageMaxTemperature
}

function buildAverageMinTemp (apiFetch, tripData) {
  const minTempList = buildListFromObjectAttribute(apiFetch, 'min_temp')
  const averageMinTemperature = calculateAverageTemperatures(minTempList)
  tripData.averageMinTemp = averageMinTemperature
}

function buildAverageDescriptionOfWeather (apiFetch, tripData) {
  const temperatureData = apiFetch

  function countDescriptions (descriptionList) {
    // Count duplicate descriptions
    // reference: https://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript
    const descriptionCounts = {}
    descriptionList.forEach(function (x) { descriptionCounts[x] = (descriptionCounts[x] || 0) + 1 })
    // DEBUG:
    // console.log(DescriptionCounts)
    return descriptionCounts
  }

  function sortCountedDescriptions (descriptionCounts) {
    const sortedDescriptions = []
    for (const num in descriptionCounts) {
      sortedDescriptions.push([num, descriptionCounts[num]])
    }
    sortedDescriptions.sort(function (a, b) {
      return b[1] - a[1]
    })
    // DEBUG:
    // console.log(sortedDescriptions)

    return sortedDescriptions
  }
  // The 16dayforcast API will return the property description. The weatherNorm API will not.
  // The condition below ensures that regardless of which api is used
  // our tripData object will receive an averageDescription.
  // eslint-disable-next-line no-prototype-builtins
  if (temperatureData[0].hasOwnProperty('weather')) {
    const weatherList = buildListFromObjectAttribute(temperatureData, 'weather')
    const descriptionList = buildListFromObjectAttribute(weatherList, 'description')

    const countedDescriptions = countDescriptions(descriptionList)
    const sortedDescriptions = sortCountedDescriptions(countedDescriptions)
    tripData.averageDescription = sortedDescriptions[0][0]
  } else {
    tripData.averageDescription = 'No forecast description'
  }
}

function buildDailyForecasts (apiFetch, tripData) {
  const temperatureData = apiFetch
  const weatherForecasts = []

  for (const i in temperatureData) {
    const day = {}

    day.date = temperatureData[i].valid_date

    // The 16dayforcast API will return the property valid_date. The weatherNorm API will not.
    // The condition below ensures that regardless of which api is used
    // our tripData object has-a a date.
    // eslint-disable-next-line no-prototype-builtins
    if (temperatureData[i].hasOwnProperty('valid_date')) {
      day.date = temperatureData[i].valid_date
    } else {
      day.date = tripData.startDate.slice(0, 7) + '-' + temperatureData[i].day
    }
    day.temp = temperatureData[i].temp
    day.max_temp = temperatureData[i].max_temp
    day.min_temp = temperatureData[i].min_temp

    // The 16dayforcast api will return the property weather.description. The weatherNorm api will not.
    // The condition below ensures that regardless of which api is used
    // our tripData object has-a day.description
    // eslint-disable-next-line no-prototype-builtins
    if (temperatureData[i].hasOwnProperty('weather')) {
      day.description = temperatureData[i].weather.description
    } else {
      day.description = 'No forecast description'
    }
    weatherForecasts.push(day)
  }

  tripData.weatherForecasts = weatherForecasts
  // DEBUG:
  // console.log(tripData)
}

// :::::::::::::::::::::::::::::::::::::::::::
// TODO: Create module for the functions below. These functions call helpers and build data related to specific api call. (whats a good name for this module?)
// :::::::::::::::::::::::::::::::::::::::::::

function buildTripDataPlaceDetails (tripData, placeDetails) {
  tripData.lat = placeDetails.postalcodes[0].lat
  tripData.lon = placeDetails.postalcodes[0].lng
}

function buildTripDataSixteenDayForecast (tripData, sixteenDayForecast) {
  const temperatureData = sixteenDayForecast.data

  buildAverageTemp(temperatureData, tripData)
  buildAverageMaxTemp(temperatureData, tripData)
  buildAverageMinTemp(temperatureData, tripData)
  buildAverageDescriptionOfWeather(temperatureData, tripData)
  buildDailyForecasts(temperatureData, tripData)
}

function buildTripDataWeatherNorms (tripData, weatherNorms) {
  const temperatureData = weatherNorms.data

  buildAverageTemp(temperatureData, tripData)
  buildAverageMaxTemp(temperatureData, tripData)
  buildAverageMinTemp(temperatureData, tripData)
  buildAverageDescriptionOfWeather(temperatureData, tripData)
  buildDailyForecasts(temperatureData, tripData)
  // DEBUG:
  // console.log(tripData)
  // console.log(weatherNorms.data)
}

function buildTripDataDestinationImage (tripData, relatedImage) {
  const destinationImage = relatedImage
  const cityImg = destinationImage.hits[0].webformatURL
  tripData.cityImg = cityImg
}

// function buildTripDataDescriptionImages (tripData, relatedImage) {
//   const descriptionImages = {}
//   for (const i in tripData.weatherForecasts) {
//     const description = tripData.weatherForecasts[i].description
//     const relatedImage = relatedImage(description)
//
//     const weatherDescriptionImg = relatedImage.hits[0].previewURL
//     descriptionImages[description] = weatherDescriptionImg
//   }
//   tripData.descriptionImages = descriptionImages
//
//   // console.log("LOG descriptionImages OBJECT")
//   // console.log(descriptionImages)
//   console.log('LOG tripData.descriptionImages OBJECT ')
//   console.log(tripData.descriptionImages)
// }

index.post('/tripData', async (req, res) => {
  try {
    // Create variables from the values posted from our index page
    const body = req.body
    const city = body.city
    const country = body.country
    const startDate = body.startDate
    const endDate = body.endDate
    const daysUntilTrip = body.daysUntilTrip
    const tripDuration = body.tripDuration
    // DEBUG
    // console.log(`req BODY: ${JSON.stringify(body)}`)

    // Begin building the properties for our tripData object.
    const tripData = {}
    tripData.city = city
    tripData.country = country
    tripData.tripDuration = tripDuration
    tripData.startDate = startDate
    tripData.endDate = endDate

    // :::::::::::::::::::::::::::::::::::::::::::
    const placeDetails = await getPlaceDetails(city, country)
    buildTripDataPlaceDetails(tripData, placeDetails)

    // Call one of two API's depending on weather the days until the users trip is over or under 15 days.
    if (daysUntilTrip <= 15) {
      const sixteenDayForecast = await getSixteenDayForecast(tripData.lat, tripData.lon, tripData.tripDuration)
      buildTripDataSixteenDayForecast(tripData, sixteenDayForecast)
    } else if (daysUntilTrip > 15) {
      const weatherNorms = await getWeatherNorms(tripData.lat, tripData.lon, tripData.startDate, tripData.endDate)
      buildTripDataWeatherNorms(tripData, weatherNorms)
    }

    const destinationImage = await getRelatedImage(city)
    buildTripDataDestinationImage(tripData, destinationImage)

    // TODO: for each daily forecast add a search pixabay for an img based on the description of the weather
    // const descriptionImages = await getRelatedImage()
    // buildTripDataDescriptionImages(tripData, descriptionImages)

    // Print out the built tripData
    console.log(tripData)
    res.json(tripData)
  } catch (error) {
    console.log(error)
  }
})

let port = process.env.PORT
if (port == null || port === '') {
  port = 8081
}
index.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
