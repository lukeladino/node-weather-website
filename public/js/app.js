console.log('Client side javascript file is loaded!')

var weatherForm = document.querySelector('form')
var search = document.querySelector('input')
var result = document.getElementById('result')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    var location = search.value
    result.innerHTML = 'Fetching data from the server...' 

    fetch(`/weather?address=${encodeURIComponent(location)}`).then((response) => {
        response.json().then((data) => {

            if(data.error) {
                result.innerHTML = data.error                
            } else {
                result.innerHTML = `${data.location} <br/><br/> ${data.forecast}`
            }

        })
    })

})