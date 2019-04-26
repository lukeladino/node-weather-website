const request = require('request')

const geocode = (address, callback) => {
    
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibHVrZWxhZGlubyIsImEiOiJjanVzMDRqaWYwbmRxNDRwODU4M200MHl2In0.aBMM7jmrh2PO7fYNyhiPtQ&limit=1`

    request({ url, json: true }, (error, { body }) => {

        if(error) {
            callback('Unable to connect to location services!', {})
        } else if(body.features.length === 0) {
            callback('Unable to find location', {})
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                lng: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })
}

module.exports = geocode