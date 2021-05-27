const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('request')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//Define Path
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//Setup hbs
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory
app.use(express.static(publicDir))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Aman Jain'
    })
})
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Aman Jain'
    })
})
app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Aman Jain'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide a search term.'
        })
    }
    geocode (req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forcast: forecastData,
                location,
                address: req.query.address
            }) 
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('404page', {
        title: '404 Page',
        name: 'Aman Jain',
        errormsg: 'Help article not found.'
    })
})
app.get('*', (req,res) => {
    res.render('404page', {
        title: '404 Page',
        name: 'Aman Jain',
        errormsg:  'Page Not Found.'
    })
})
app.listen(port, () => {
    console.log('Our server is live on ' + port + '.')
})