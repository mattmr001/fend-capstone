const button = document.getElementById('generate')
button.addEventListener('click', handleSubmit);

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    const city = document.getElementById('city').value
    const country = document.getElementById('country').value
    const startDate = document.getElementById('startDate').value
    const endDate = document.getElementById('endDate').value

    // Client.checkForName(formText)

    const clock = new Client.tripClock(startDate,endDate);
    const tripDuration = clock.calculateTripDuration
    const daysUntilTrip = clock.calculateDaysUntilTrip

    const formattedStartDate = clock.formattedStartDate
    const formattedEndDate = clock.formattedEndDate

    console.log(daysUntilTrip)

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/tripData',{
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'city' : `${city}`,
            'country' : `${country}`,
            'startDate' : `${formattedStartDate}`,
            'endDate' : `${formattedEndDate}`,
            'tripDuration': `${tripDuration}`,
            'daysUntilTrip': `${daysUntilTrip}`,
        }),
    })
        .then(res => {
            return res.json()
        })
        .then(function(data) {

            function buildBanner(){
                // Append the img url from our data to the banner
                let banner = document.querySelector('#banner')
                let bannerImg = document.createElement('img')
                bannerImg.classList.add('banner-img')
                bannerImg.src = `${data.cityImg}`
                banner.appendChild(bannerImg)
            }

            function buildTrip(){
                const tripFragment = new DocumentFragment()
                let trips = document.querySelector('#trips')

                let tripDiv = document.createElement('div')
                tripDiv.classList.add('trip')

                // add trip departure data to the tripDiv
                let departureDiv = document.createElement('div')
                departureDiv.classList.add('departure')
                let departureCity = document.createElement('p')
                departureCity.classList.add('departure__item')
                departureCity.innerHTML = `My trip to ${city}`
                let departureDate = document.createElement('p')
                departureDate.classList.add('departure__item')
                departureDate.innerHTML = `Departing ${startDate}`
                departureDiv.appendChild(departureCity)
                departureDiv.appendChild(departureDate)
                tripDiv.appendChild(departureDiv)

                // add trip countdown data to the tripDiv
                let countDownDiv = document.createElement('div')
                countDownDiv.classList.add('count-down')
                let daysUntilTripPara = document.createElement('p')
                daysUntilTripPara.classList.add('count-down__item')
                daysUntilTripPara.innerHTML = `${city}, ${country} is ${daysUntilTrip} days away`

                countDownDiv.appendChild(daysUntilTripPara)
                tripDiv.appendChild(countDownDiv)

                // add average temperature data to tripDiv
                let averageTemperaturesDiv = document.createElement('div')
                averageTemperaturesDiv.classList.add('average-temperatures')

                let headline = document.createElement('p')
                headline.classList.add('average-temperature__headline')
                headline.innerHTML = `Typical weather for then is:`

                let avgMaxTempPara = document.createElement('p')
                avgMaxTempPara.classList.add('average-temperature__data')
                avgMaxTempPara.classList.add('average-temperature__data--max')
                avgMaxTempPara.innerHTML = `High: ${data.averageMaxTemp}°`
                let avgMinTempPara = document.createElement('p')
                avgMinTempPara.classList.add('average-temperature__data')
                avgMinTempPara.classList.add('average-temperature__data--min')
                avgMinTempPara.innerHTML = `Low: ${data.averageMinTemp}°`

                let avgTempDescriptionPara = document.createElement('p')
                avgTempDescriptionPara.classList.add('average-temperature__data')
                avgTempDescriptionPara.classList.add('average-temperature__data--description')
                avgTempDescriptionPara.innerHTML = `${data.averageDescription}`

                averageTemperaturesDiv.appendChild(headline)
                averageTemperaturesDiv.appendChild(avgMaxTempPara)
                averageTemperaturesDiv.appendChild(avgMinTempPara)
                averageTemperaturesDiv.appendChild(avgTempDescriptionPara)
                tripDiv.appendChild(averageTemperaturesDiv)

                tripFragment.appendChild(tripDiv)
                trips.appendChild(tripFragment)

            }

            function buildWeatherForecasts(){
                // Append the data.weatherForecasts to our organism weather-forecasts
                const weatherForecastsFragment = new DocumentFragment()
                let weatherForecasts = document.querySelector('#weatherForecasts')
                weatherForecasts.classList.add('weather-forecasts');

                for (let i in data.weatherForecasts) {

                    let dayDiv = document.createElement('div')
                    dayDiv.classList.add('day');
                    dayDiv.classList.add('raised-background');

                    let dayDataDatePara = document.createElement('p')
                    dayDataDatePara.classList.add('day__data');
                    dayDataDatePara.classList.add('day__data--date');
                    dayDataDatePara.innerHTML = `${data.weatherForecasts[i].date}`
                    dayDiv.appendChild(dayDataDatePara)

                    let dayDataImg = document.createElement('img')
                    dayDataImg.classList.add('day__data');
                    dayDataImg.classList.add('day__data--img');
                    dayDataImg.src = "https://place-hold.it/48x48"
                    dayDiv.appendChild(dayDataImg)

                    let dayDataTemperaturePara = document.createElement('p')
                    dayDataTemperaturePara.classList.add('day__data');
                    dayDataTemperaturePara.classList.add('day__data--temp-max');
                    dayDataTemperaturePara.innerHTML = `${data.weatherForecasts[i].temp}°`
                    dayDiv.appendChild(dayDataTemperaturePara)

                    let dayDataDescriptionPara = document.createElement('p')
                    dayDataDescriptionPara.classList.add('day__data');
                    dayDataDescriptionPara.classList.add('day__data--description');
                    dayDataDescriptionPara.innerHTML = `${data.weatherForecasts[i].description}`
                    dayDiv.appendChild(dayDataDescriptionPara)

                    weatherForecastsFragment.appendChild(dayDiv)
                }
                weatherForecasts.appendChild(weatherForecastsFragment)
            }

            function buttonCleanup() {
                console.log('remove classes, elements and event listeners that were added by the Hamburger')
                button.removeEventListener('click', handleSubmit);
            }

            buildBanner();
            buildTrip();
            buildWeatherForecasts();
            buttonCleanup();

            // DEBUG
            // all values
            // let main = document.querySelector('main')
            // let list = document.createElement('ul')
            // const allValuesFragment = new DocumentFragment()
            // for (let key in data){
            //     if(data.hasOwnProperty(key)){
            //         console.log(`${key} : ${data[key]}`)
            //         let li = document.createElement('li')
            //         li.innerHTML = `${key} : ${data[key]}`
            //         allValuesFragment.appendChild(li)
            //     }
            // }
            // list.appendChild(allValuesFragment)
            // main.appendChild(list)
        })
}

export { handleSubmit }
