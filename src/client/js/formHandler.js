document.getElementById('generate').addEventListener('click', handleSubmit);

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    const city = document.getElementById('city').value
    const country = document.getElementById('country').value
    let startDate = document.getElementById('startDate').value
    let endDate = document.getElementById('endDate').value
    // Client.checkForName(formText)


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
            'startDate' : `${startDate}`,
            'endDate' : `${endDate}`,
        }),
    })
        .then(res => {
            return res.json()
        })
        .then(function(data) {
            const myForm = document.getElementById("myForm");
            myForm.remove();

            // DEBUG
            // Uncomment to log the values in Dataset
            // Single value
            let list = document.querySelector('#list')
            const singleValueFragment = new DocumentFragment()
            let li = document.createElement('li')
            li.innerHTML = `${data.img}`
            list.appendChild(li)
            singleValueFragment.appendChild(list)

            // DEBUG
            // all values
            // let list = document.querySelector('#list')
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

            // Append the img url from our data to the banner
            let banner = document.querySelector('#banner')
            const bannerFragment = new DocumentFragment()
            let bannerImg = document.createElement('img')
            bannerImg.classList.add('banner-img')
            bannerImg.src = `${data.cityImg}`
            bannerFragment.appendChild(bannerImg)
            banner.appendChild(bannerFragment)



            // Append the data.weatherForecasts to our organism weather-forecasts
            const weatherForecastsFragment = new DocumentFragment()
            let weatherForecasts = document.querySelector('#weatherForecasts')
            weatherForecasts.classList.add('weather-forecasts');

            for (let i in data.weatherForecasts) {

                let day = document.createElement('div')
                day.classList.add('day');

                let dayDataDate = document.createElement('p')
                dayDataDate.classList.add('day__data');
                dayDataDate.classList.add('day__data--date');
                dayDataDate.innerHTML = `${data.weatherForecasts[i].validDate}`
                day.appendChild(dayDataDate)

                let dayDataImg = document.createElement('img')
                dayDataImg.classList.add('day__data');
                dayDataImg.classList.add('day__data--img');
                dayDataImg.src = "https://place-hold.it/48x48"
                day.appendChild(dayDataImg)

                let dayDataTempMax = document.createElement('p')
                dayDataTempMax.classList.add('day__data');
                dayDataTempMax.classList.add('day__data--temp-max');
                dayDataTempMax.innerHTML = `${data.weatherForecasts[i].maxTemp}°`
                day.appendChild(dayDataTempMax)

                let dayDataTempLow = document.createElement('p')
                dayDataTempLow.classList.add('day__data');
                dayDataTempLow.classList.add('day__data--temp-low');
                dayDataTempLow.innerHTML = `${data.weatherForecasts[i].lowTemp}°`
                day.appendChild(dayDataTempLow)

                let dayDataDescription = document.createElement('p')
                dayDataDescription.classList.add('day__data');
                dayDataDescription.classList.add('day__data--description');
                dayDataDescription.innerHTML = `${data.weatherForecasts[i].description}`
                day.appendChild(dayDataDescription)

                weatherForecastsFragment.appendChild(day)
            }
            weatherForecasts.appendChild(weatherForecastsFragment)

        })
}

export { handleSubmit }
