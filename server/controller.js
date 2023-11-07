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

const deleteMovieById = (id) => {
    return knex('movies').where('id', id).del()
}

const updateUserReview = (id, user_score, user_review) => {
    return (
        knex('movies')
        .where('id', id)
        .update({
            user_score: user_score,
            user_review: user_review
        })
    )


}

module.exports = {
  getAllMovies,
  getMovieById,
  insertNewMovie,
  deleteMovieById,
  updateUserReview,
};