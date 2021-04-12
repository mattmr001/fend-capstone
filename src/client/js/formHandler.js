document.getElementById('generate').addEventListener('click', handleSubmit);

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    // Client.checkForName(formText)


    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/sentiment',{
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ formText: formText }),
    })
        .then(res => {
            return res.json()
        })
        .then(function(data) {
            let list = document.querySelector('#list')
            const fragment = new DocumentFragment()

            for (let key in data){
                if(data.hasOwnProperty(key)){
                    console.log(`${key} : ${data[key]}`)
                    let li = document.createElement('li')
                    li.innerHTML = `${key} : ${data[key]}`
                    fragment.appendChild(li)
                }
            }

            list.appendChild(fragment)
        })
}

export { handleSubmit }
