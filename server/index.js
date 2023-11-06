const express = require('express')
const cors = require('cors')
const port = 8080
const {
  getAllMovies,
  getMovieById,
  insertNewMovie,
  deleteMovieById,
  updateUserReview,
} = require("./controller");

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

app.post('/movies', (req, res) => {
    const movie = req.body

    insertNewMovie(movie)
        .then(data => res.status(201).send('New movie added'))
        .catch(err => res.status(400).send('Invalid request'))
})

// Fetch movie by id
app.get('/movies/:id', (req, res) => {
    const { id } = req.params

    getMovieById(id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(404).send('Page not found'))
})

app.patch('/movies/:id', (req, res) => {
    const { id } = req.params
    const { user_score, user_review } = req.body
    
    updateUserReview(id, user_score, user_review)
        .then(data => res.status(200).send('Movie review updated'))
        .catch(err => res.status(400).send('Invalid request'))
})

app.delete('/movies/:id', (req, res) => {
    const { id } = req.params

    deleteMovieById(id)
        .then(data => res.status(200).send('Movie deleted'))
        .catch(err => res.status(400).send('Invalid request'))
})

app.listen(port, () => {

    console.log(`Express server listening on ${port}`)
})