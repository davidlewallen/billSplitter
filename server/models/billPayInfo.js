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
>>>>>>> 69b0f9ca8aea8a5c501d9f76c4d021745c382521
