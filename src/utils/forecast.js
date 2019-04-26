const request = require('request')

/*
    data = {
        latitude: '',
        longitude: '',
        location: ''
    }
*/
const forecast = (lat, lng, callback) => {
    
    const url = `https://api.darksky.net/forecast/20fafc9a4464bb06523f41ddc0080fe1/${lat},${lng}`;

    request({ url, json: true }, (error, { body }) => {

        if(error) {
            callback('Unable to connect to weather service!', {})
        } else if(body.error) {
            callback(body.error, {})
        } else {
            var currently = body.currently
            callback(undefined, `${body.daily.data[0].summary} It is currently ${currently.temperature} degrees out. This high today is ${body.daily.data[0].temperatureHigh} with a low of ${body.daily.data[0].temperatureLow}. There is a ${currently.precipProbability}% chance of rain.`)
        }
        
    })

}

module.exports = forecast