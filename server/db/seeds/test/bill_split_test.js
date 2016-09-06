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
};