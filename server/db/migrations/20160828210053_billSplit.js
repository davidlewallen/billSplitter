exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments();
      table.string('first_name').notNullable();
      table.string('last_name');
      table.string('email');
    }),

    knex.schema.createTable('bills', function(table) {
      table.increments();
      table.string('company_name').notNullable();
      table.date('due_date').notNullable();
      table.integer('amount_total').notNullable();
      table.integer('amount_remaining').notNullable();
      table.integer('amount_per_person').notNullable();
      table.string('created_by').notNullable();
      table.integer('group_id').notNullable().references('id').inTable('groups');
    }),

    knex.schema.createTable('groups', function(table) {
      table.increments();
      table.string('name').notNullable();
    }),

    knex.schema.createTable('bill_pay_info', function(table) {
      table.increments();
      table.integer('user_id').notNullable().references('id').inTable('users');
      table.integer('bill_id').notNullable().references('id').inTable('bills');
      table.bool('paid').notNullable();
      table.date('date_paid');
      table.integer('amount_paid');
    })
  ])  
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('bills')
    .dropTableIfExists('groups')
    .dropTableIfExists('bill_pay_info');
};
