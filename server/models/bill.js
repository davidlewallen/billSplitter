const knex = require('../db/knex');

module.exports = {
  getBills,
  getBillById,
  getBillsByGroup,
  createBill,
  payBill,
}

function getBills() {
  return knex.select('*').from('bills');
};

function getBillById(billId) {
  return knex('bills').where('id', billId);
};

function getBillsByGroup(groupId) {
  return knex('bills').where('group_id', groupId);
};

function createBill(billData) {
  return knex('bills').insert(billData).returning([
    'id',
    'company_name',
    'due_date',
    'amount_total',
    'amount_remaining',
    'amount_per_person',
    'user_id',
    'group_id'
  ]);
};

function payBill(payDetails) {
  const currentDate = new Date();
  
  return knex('bill_pay_info')
  .where({ user_id: userId, bill_id: billId })
  .update({ paid: true, date_paid: currentDate })
  .returning(['id', 'user_id', 'bill_id', 'paid', 'date_paid']);
}
