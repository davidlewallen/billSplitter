const knex = require('../db/knex');

module.exports = {
  createUser,
}

function createUser(userId, billId) {
  return knex('bill_pay_info').insert({
    user_id: userId,
    bill_id: billId,
    paid   : false,
  })
}