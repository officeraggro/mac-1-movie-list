/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('movies', table => {
        table.increments('id')
        table.string('title').notNullable()
        table.string('genre').notNullable()
        table.string('synopsis').notNullable()
        table.string('release_date').notNullable()
        table.string('rating').notNullable()
        table.string('runtime').notNullable()
        table.string('director').notNullable()
        table.string('poster_url').notNullable()
        table.string('imdb_score').notNullable()
        table.string('user_score').notNullable()
        table.string('user_review').notNullable()
        table.boolean('watch').notNullable()
        table.boolean('to_watch').notNullable()
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('movies')
  
};
