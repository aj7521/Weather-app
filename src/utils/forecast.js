const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=dd1f34f5fa9916621655a4b5f4202ce5&query='+ encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)+'&units=m'
    request({ url, json:true }, (error,{ body }) => {
        if(error){
            callback('Unable to connect to the internet.', undefined)
        }else if(body.error){
            callback('Unable to find the location.', undefined)
        }else{
            callback(undefined,('It is '+body.current.weather_descriptions+' currently. And temperature is '+ body.current.temperature+'. There is '+body.current.precip+'% chance of rain.'))
        }
    })
}

module.exports = forecast