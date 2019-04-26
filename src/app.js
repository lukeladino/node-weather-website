const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home App',
        name: 'Luke Go'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Luke Go'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Luke Go'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address form'
        })
    }

    geocode(req.query.address, (error, {lat, lng, location}) => {
        
        if(error) {
            return res.send({ error })
        } else {
            
            forecast(lat, lng, (error, forecast) => {
    
                if(error) {
                    return res.send({ error })
                } else {
                    return res.send({
                        location,
                        forecast 
                    })
                }
            
            })
        }
    
    })

})

app.get('/products', (req, res) => {

    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search form'
        })
    }

    res.send({
        products: []
    })

})

app.get('*', (req, res) => {
    res.send('My 404 page')
})

app.listen(port, () => {
    console.log(`Server is up at port ${port}`)
})