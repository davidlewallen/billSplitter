const knex = require('../db/knex');

module.exports = {
  findOrCreate,
  getUserByGoogleId,
  getUserById,
  getUserByEmail,
  getUsersByGroup,
  createUser,
  setUserGroup,
}

function findOrCreate(profile) {
  return getUserByGoogleId(profile.id)
  .then(user =>
    !user.length
    ? createUser(profile)
    : getUserByGoogleId(profile.id)
  );
}
function getUserByGoogleId(googleId) {
  return knex('users').where('google_id', googleId);
}

function getUserById(userId) {
  return knex('users').where('id', userId);
}

function getUserByEmail(userEmail) {
  return knex('users').where('email', userEmail);
}

function getUsersByGroup(groupId) {
  return knex('users').where('group_id', groupId);
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

function setUserGroup(userId, groupId) {
  return knex('users')
    .where('id', userId)
    .insert({ group_id: groupId })
    .returning(['id', 'first_name', 'last_name', 'group_id']);
}


