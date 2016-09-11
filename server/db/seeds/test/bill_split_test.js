exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users').del(),
    knex('bills').del(),
    knex('groups').del(),
    knex('bill_pay_info').del(),
  ])
  .then(() => {
    return knex('groups').insert({
      name       : 'test',
      created_by : 'test1',
      group_code : 'AbCd0'
    })
  })
  .then(() => {
    return knex('groups').insert({
      name       : 'testFind',
      created_by : 'test2',
      group_code : 'ABCD0'
    })
  })
  .then(() => {
    return knex('users').insert({
      google_id  : '100190799640047046019',
      first_name : 'David',
      last_name  : 'Lewallen',
      email      : 'lewallen.david@gmail.com',
    });
  })
  .then(() => {
    return knex('users').insert({
      google_id  : 1234,
      first_name : 'testName',
      last_name  : 'nameTest',
      email      : 'test@gmail.com',
      group_id   : 2,
    })
  })
  .then(() => {
    return knex('users').insert({
      google_id  : 12345,
      first_name : 'testName2',
      last_name  : 'nameTest2',
      email      : 'test2@gmail.com',
      group_id   : 2,
    })
  })
  .then(() => {
    return knex('users').insert({
      google_id  : 123456,
      first_name : 'group',
      last_name  : 'Join',
      email      : 'groupJoin@gmail.com'
    })
  })
  .then(() => {
    return knex('users').insert({
      google_id  : 1,
      first_name : 'test1',
      last_name  : 'test-1',
      email      : 'test1@gmail.com',
      group_id   : 1
    })
  })
  .then(() => {
    return knex('users').insert({
      google_id  : 2,
      first_name : 'test2',
      last_name  : 'test-2',
      email      : 'test2@gmail.com',
      group_id   : 1
    })
  })
  .then(() => {
    return knex('bills').insert({
      company_name      : 'testCompany',
      due_date          : '2016-09-09',
      amount_total      : 157.32,
      amount_remaining  : 157.32,
      amount_per_person : 78.66,
      user_id           : 5,
      group_id          : 1
    })
  })
  .then(() => {
    return knex('bills').insert({
      company_name      : 'testCompany1',
      due_date          : '2016-09-10',
      amount_total      : 200,
      amount_remaining  : 100,
      amount_per_person : 100,
      user_id           : 5,
      group_id          : 1
    })
  })
  .then(() => {
    return knex('bill_pay_info').insert({
      user_id: 5,
      bill_id: 1,
      paid: false,
    })
  })
  .then(() => {
    return knex('bill_pay_info').insert({
      user_id: 6,
      bill_id: 1,
      paid: false,
    })
  })
};