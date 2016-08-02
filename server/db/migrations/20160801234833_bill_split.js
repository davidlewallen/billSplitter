// TODO: Finish implementing tables
exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTable('users', function(table) {
			table.increments();
			table.string('name').notNullable();
			table.string('email');
		}),
		knex.schema.createTable('bill_list', function(table) {
			table.increments();
			table.string('company').notNullable();
			table.integer('amount').notNullable();
			table.integer('amount_per_person').notNullable();
			// TODO: Implement due date
			table.
		})
	])  
};

// TODO: Finish implementing exports.down
exports.down = function(knex, Promise) {
  
};
