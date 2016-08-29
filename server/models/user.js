var knex = require('../db/knex');

module.exports = {
  findOrCreate,
}

function findOrCreate(profile) {
  return getUserByGoogleId(profile.id)
    .then(user =>
      !user.length
      ? createUser(profile)
      : findUser(profile.id)
    );
}
function getUserByGoogleId(googleId) {
  return knex('users').where('google_id', googleId);
}

function createUser(profile) {
  const userData = {
    google_id  : profile.id,
    first_name : profile.name.givenName,
    last_name  : profile.name.familyName,
    email      : profile.emails[0].value,
  }

  return knex('users').insert(userData).returning([
    'google_id',
    'first_name',
    'last_name',
    'email',
  ])
}
