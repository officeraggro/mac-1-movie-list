const knex = require("knex")(require("./knexfile.js")["development"]);

const getAllMovies = () => {
    return knex('movies').select('*')
}

const getMovieById = (id) => {
    return knex('movies').select('*').where('id', id)
}

const insertNewMovie = (movie) => {
    return knex('movies').insert(movie)
}

module.exports = { getAllMovies, getMovieById, insertNewMovie }