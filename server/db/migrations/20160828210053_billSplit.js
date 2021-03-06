exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments();
      table.string('google_id').notNullable();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').notNullable();
      table.integer('group_id').references('id').inTable('groups');
    }),

    knex.schema.createTable('bills', function(table) {
      table.increments();
      table.string('company_name').notNullable();
      table.date('due_date').notNullable();
      table.decimal('amount_total').notNullable();
      table.decimal('amount_remaining').notNullable();
      table.decimal('amount_per_person').notNullable();
      table.integer('user_id').notNullable().references('id').inTable('users');
      table.integer('group_id').notNullable().references('id').inTable('groups');
    }),

    knex.schema.createTable('groups', function(table) {
      table.increments();
      table.string('name').notNullable();
      table.string('created_by').notNullable();
      table.string('group_code').notNullable();
    }),

    knex.schema.createTable('bill_pay_info', function(table) {
      table.increments();
      table.integer('user_id').notNullable().references('id').inTable('users');
      table.integer('bill_id').notNullable().references('id').inTable('bills');
      table.bool('paid').notNullable();
      table.date('date_paid');
    })
  ])  
};

exports.down = function(knex, Promise) {
  return knex.schema
    .raw('DROP TABLE users CASCADE')
    .raw('DROP TABLE bills CASCADE')
    .dropTableIfExists('groups')
    .dropTableIfExists('bill_pay_info');
};
