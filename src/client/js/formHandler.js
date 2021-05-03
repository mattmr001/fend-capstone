const button = document.getElementById('generate')
button.addEventListener('click', handleSubmit)

function handleSubmit (event) {
  event.preventDefault()

  // check what text was put into the form field
  const city = document.getElementById('city').value
  const country = document.getElementById('country').value
  const startDate = document.getElementById('startDate').value
  const endDate = document.getElementById('endDate').value

  // Client.checkForName(formText)

  // eslint-disable-next-line no-undef
  const clock = new Client.TripClock(startDate, endDate)
  const tripDuration = clock.calculateTripDuration
  const daysUntilTrip = clock.calculateDaysUntilTrip

  const formattedStartDate = clock.formattedStartDate
  const formattedEndDate = clock.formattedEndDate

  console.log(daysUntilTrip)

  console.log('::: Form Submitted :::')
  // eslint-disable-next-line no-undef
  fetch('http://localhost:8081/tripData', {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      city: `${city}`,
      country: `${country}`,
      startDate: `${formattedStartDate}`,
      endDate: `${formattedEndDate}`,
      tripDuration: `${tripDuration}`,
      daysUntilTrip: `${daysUntilTrip}`
    })
  })
    .then(res => {
      return res.json()
    })
    .then(function (data) {
      function buildBanner (parentDiv) {
        // Append the img url from our data to the banner
        const bannerDiv = document.createElement('div')
        bannerDiv.classList.add('trip__banner')
        const bannerImg = document.createElement('img')
        bannerImg.classList.add('trip__banner__img')
        bannerImg.src = `${data.cityImg}`
        bannerDiv.appendChild(bannerImg)
        parentDiv.appendChild(bannerDiv)
      }
      function buildTripDeparture (parentDiv) {
        // add trip departure data to the tripDiv
        const departureDiv = document.createElement('div')
        departureDiv.classList.add('trip__trip-info__departure')
        const departureCity = document.createElement('h2')
        departureCity.classList.add('trip__trip-info__data')
        departureCity.innerHTML = `My trip to ${city}`
        const departureDate = document.createElement('h2')
        departureDate.classList.add('departure__item')
        departureDate.innerHTML = `Departing ${startDate}`
        parentDiv.appendChild(departureCity)
        parentDiv.appendChild(departureDate)
        parentDiv.appendChild(departureDiv)
      }
      function buildCountDown (parentDiv) {
        // add trip countdown data to the tripDiv
        const countDownDiv = document.createElement('div')
        countDownDiv.classList.add('trip__trip-info__count-down')
        const daysUntilTripPara = document.createElement('h3')
        daysUntilTripPara.classList.add('trip__trip-info__data')
        daysUntilTripPara.innerHTML = `${city}, ${country} is ${daysUntilTrip} days away`

        countDownDiv.appendChild(daysUntilTripPara)
        parentDiv.appendChild(countDownDiv)
      }
      function buildAverageTemperatures (parentDiv) {
        const averageTemperaturesDiv = document.createElement('div')
        averageTemperaturesDiv.classList.add('trip__trip-info__average-temperatures')

        const headline = document.createElement('p')
        headline.classList.add('trip__trip-info__data')
        headline.innerHTML = 'Typical weather for then is:'

        const avgMaxTempPara = document.createElement('p')
        avgMaxTempPara.classList.add('trip__trip-info__data')
        avgMaxTempPara.classList.add('trip__trip-info__data--temp-max')
        avgMaxTempPara.innerHTML = `High: ${data.averageMaxTemp}°`
        const avgMinTempPara = document.createElement('p')
        avgMinTempPara.classList.add('trip__trip-info__data')
        avgMinTempPara.classList.add('trip__trip-info__data--temp-min')
        avgMinTempPara.innerHTML = `Low: ${data.averageMinTemp}°`

        const avgTempDescriptionPara = document.createElement('p')
        avgTempDescriptionPara.classList.add('trip__trip-info__data')
        avgTempDescriptionPara.classList.add('trip__trip-info__data--description')
        avgTempDescriptionPara.innerHTML = `${data.averageDescription}`

        averageTemperaturesDiv.appendChild(headline)
        averageTemperaturesDiv.appendChild(avgMaxTempPara)
        averageTemperaturesDiv.appendChild(avgMinTempPara)
        averageTemperaturesDiv.appendChild(avgTempDescriptionPara)
        parentDiv.appendChild(averageTemperaturesDiv)
      }
      function buildDailyWeatherForecasts (parentDiv) {
        // Append the data.weatherForecasts to our organism weather-forecasts
        // eslint-disable-next-line no-undef
        const tripDailyForecastsFragment = new DocumentFragment()
        const tripDailyForecastsDiv = document.createElement('div')
        tripDailyForecastsDiv.classList.add('trip__daily-forecasts')
        // const tripDailyForecastsFragment = new DocumentFragment()
        // const weatherForecasts = document.querySelector('#weatherForecasts')
        // weatherForecasts.classList.add('weather-forecasts')

        for (const i in data.weatherForecasts) {
          const dayDiv = document.createElement('div')
          dayDiv.classList.add('day')
          dayDiv.classList.add('raised-background')

          const dayDataDatePara = document.createElement('p')
          dayDataDatePara.classList.add('day__data')
          dayDataDatePara.classList.add('day__data--date')
          dayDataDatePara.innerHTML = `${data.weatherForecasts[i].date}`
          dayDiv.appendChild(dayDataDatePara)

          const dayDataImg = document.createElement('img')
          dayDataImg.classList.add('day__data')
          dayDataImg.classList.add('day__data--img')
          dayDataImg.src = 'https://place-hold.it/48x48'
          dayDiv.appendChild(dayDataImg)

          const dayDataTemperaturePara = document.createElement('p')
          dayDataTemperaturePara.classList.add('day__data')
          dayDataTemperaturePara.classList.add('day__data--temp-max')
          dayDataTemperaturePara.innerHTML = `${data.weatherForecasts[i].temp}°`
          dayDiv.appendChild(dayDataTemperaturePara)

          const dayDataDescriptionPara = document.createElement('p')
          dayDataDescriptionPara.classList.add('day__data')
          dayDataDescriptionPara.classList.add('day__data--description')
          dayDataDescriptionPara.innerHTML = `${data.weatherForecasts[i].description}`
          dayDiv.appendChild(dayDataDescriptionPara)

          tripDailyForecastsFragment.appendChild(dayDiv)
        }
        tripDailyForecastsDiv.appendChild(tripDailyForecastsFragment)
        parentDiv.appendChild(tripDailyForecastsDiv)
      }
      function buildTripInfo (parentDiv) {
        const tripDataDiv = document.createElement('div')
        tripDataDiv.classList.add('trip__trip-info')
        buildTripDeparture(tripDataDiv)
        buildCountDown(tripDataDiv)
        buildAverageTemperatures(tripDataDiv)
        parentDiv.appendChild(tripDataDiv)
      }
      function buildTrip () {
        const mainElm = document.querySelector('#mainContainer')
        // eslint-disable-next-line no-undef
        Client.buildHeadlineRow(mainElm)
        // eslint-disable-next-line no-undef
        const tripFragment = new DocumentFragment()
        const trips = document.querySelector('#trips')
        const tripDiv = document.createElement('div')
        tripDiv.classList.add('trip')
        buildBanner(tripDiv)
        buildTripInfo(tripDiv)
        buildDailyWeatherForecasts(tripDiv)
        tripFragment.appendChild(tripDiv)
        trips.prepend(tripFragment)
      }
      function cleanUp () {
        const formWrapper = document.getElementById('formWrapper')
        formWrapper.remove()
      }
      buildTrip()
      cleanUp()
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
