const knex = require('../db/knex');

module.exports = {
  getGroupById,
  createGroup,
}

function getGroupById(groupId) {
  return knex('group').where(id, groupId);
}

function createGroup(groupName) {
  return knex('group').insert(groupName);
}