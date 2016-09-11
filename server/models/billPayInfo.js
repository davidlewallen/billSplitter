const knex = require('../db/knex');

module.exports = {
  createUser,
  payBill,
}

function createUser(users) {
  return knex('bill_pay_info').insert({
    user_id: userId,
    bill_id: billId,
    paid   : false,
  })
}

function payBill(payDetails) {
  const currentDate = new Date();
  return knex('bill_pay_info')
  .where({ user_id: payDetails.userId, bill_id: payDetails.billId })
  .update({ paid: true, date_paid: currentDate })
  .returning(['id', 'user_id', 'bill_id', 'paid', 'date_paid']);
}
