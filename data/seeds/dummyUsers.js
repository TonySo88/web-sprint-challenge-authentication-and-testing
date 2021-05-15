exports.seed = async function(knex) {
    await knex('users').truncate()
    await knex('users').insert([
        {username: "JaneDoe", password: "password1"},
        {username: "JohnDoe", password: "password1"}
    ])
}