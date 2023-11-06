const express = require('express')
const cors = require('cors')
const port = 8080
const { getAllMovies, getMovieById } = require('./controller')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).send('Setting up some boiler plate for mini-app 1')
})

// Fetch all movies
app.get('/movies', (req, res) => {
    getAllMovies()
        .then(data => res.status(200).send(data))
        .catch(err => res.status(404).send('Page not found'))
})

// Fetch movie by id
app.get('/movies/:id', (req, res) => {
    const { id } = req.params

    getMovieById(id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(404).send('Page not found'))
})

app.listen(port, () => {

    console.log(`Express server listening on ${port}`)
})