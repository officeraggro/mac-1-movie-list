const knex = require("knex")(require("./knexfile.js")["development"]);

const getAllMovies = () => {
    return knex('movies').select('*')
}

const getMovieById = (id) => {
    return knex('movies').select('*').where('id', id)
}

module.exports = { getAllMovies, getMovieById }