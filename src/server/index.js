
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

async function getArticleSentiment(url) {
    try {
        const protocol = 'https'
        const sentimentApiUrl = 'api.meaningcloud.com/sentiment-2.1'
        const params = {
            key: `${process.env.API_KEY}`,
            of: "json",
            lang: "en",
            url: url
        }
        const options = {
            method: 'POST',
            origin: ['http://localhost:8081', 'https://fierce-falls-84600.herokuapp.com'],
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const apiQuery = `${protocol}://${sentimentApiUrl}?${querystring.stringify(params)}`
        console.log(apiQuery)
        const result = await fetch(apiQuery, options)
        const resultJson = await result.json();
        return resultJson
    } catch (error) {
        throw(error)
    }
}

app.post('/sentiment', async(req, res) => {
    try {
        const body = req.body
        // DEBUG
        // console.log(`req BODY: ${JSON.stringify(body)}`)
        const articleUrl = body.formText
        // DEBUG
        // console.log(`req BODY URL: ${JSON.stringify(articleUrl)}`)
        console.log('Fetching data from API endpoint:')
        const articleSentiment = await getArticleSentiment(articleUrl)
        let newData = {
                agreement: articleSentiment.agreement,
                subjectivity: articleSentiment.subjectivity,
                confidence: articleSentiment.confidence,
                irony: articleSentiment.irony,
        }

        res.json(newData)
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



console.log('test')

console.log(`Your API key is ${process.env.API_KEY}`);
