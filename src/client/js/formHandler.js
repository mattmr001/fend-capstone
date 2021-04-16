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
            var myForm = document.getElementById("myForm");
            myForm.remove();

            // Output all of the data
            let list = document.querySelector('#list')
            const fragment = new DocumentFragment()

            // for (let key in data){
            //     if(data.hasOwnProperty(key)){
            //         console.log(`${key} : ${data[key]}`)
            //         let li = document.createElement('li')
            //         li.innerHTML = `${key} : ${data[key]}`
            //         fragment.appendChild(li)
            //     }
            // }
            // list.appendChild(fragment)

            // Create test to retreive single value from data.weatherForcast
            for (let i in data.weatherForecasts) {

                let li = document.createElement('li')
                li.innerHTML = `${data.weatherForecasts[i].validDate}`
                fragment.appendChild(li)

            }
            list.appendChild(fragment)

                    // let days = document.createElement('div')
                    // days.classList.add('weather-forecasts');
                    // let day = document.createElement('div')
                    // day.classList.add('day');
                    // let dayDataTempMax = document.createElement('p')
                    // dayDataTempMax.classList.add('day__data');
                    // dayDataTempMax.classList.add('day__data--temp-max');
                    // dayDataTempMax.innerHTML = `${i} : ${data[i]}`
                    // let dayDataTempLow = document.createElement('p')
                    // dayDataTempLow.classList.add('day__data');
                    // dayDataTempLow.classList.add('day__data--temp-low');
                    // let dayDataImg = document.createElement('img')
                    // dayDataImg.classList.add('day__data');
                    // dayDataImg.classList.add('day__data--img');

                    // // li.innerHTML = `${key} : ${data[key]}`
                    // fragment.appendChild(li)
        //         }
        //     }

        })
}

export { handleSubmit }
