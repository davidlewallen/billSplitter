const knex = require('../db/knex');

module.exports = {
  getGroupById,
  createGroup,
}

function getGroupById(groupId) {
  return knex('groups').where('id', groupId);
}

function createGroup(groupData) {
  return knex('groups').insert(groupData).returning(['id', 'name', 'created_by']);
}