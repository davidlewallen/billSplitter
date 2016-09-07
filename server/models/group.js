const knex = require('../db/knex');

module.exports = {
  getGroupById,
  getGroupByCode,
  createGroup,
}

function getGroupById(groupId) {
  return knex('groups').where('id', groupId);
}

function getGroupByCode(groupCode) {
  return knex('groups').where('group_code', groupCode);
}

function createGroup(groupData) {
  let data = Object.assign(groupData, { group_code: generateGroupCode() });
  return knex('groups').insert(groupData).returning(['id', 'name', 'created_by']);
}


// Generates a random 5 character string to allow users to join a specific group
function generateGroupCode() {
  const possibile = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'
  let text = [];

  for(let i = 0; i < 5; i++) {
    text.push(possibile.charAt(Math.floor(Math.random() * possibile.length)))
  };

  return text.join('');
}