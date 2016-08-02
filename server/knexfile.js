module.exports = {
	test: {
		client: 'pg',
		connection: 'postgres://localhost/bill_split_test',
		migrations: {
			directory: __dirname + '/db/migrations'
		},
		seeds: {
			directory: __dirname + '/db/seeds/test'
		},
		userNullAsDefault: true
	},
	development: {
		client: 'pg',
		connection: 'postgres://localhost/bill_split',
		migrations: {
			directory: __dirname + '/db/migrations'
		},
		seeds: {
			directory: __dirname + '/db/seeds/development'
		},
		userNullAsDefault: true
	},
	production: {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		migrations: {
			directory: __dirname + '/db/migrations'
		},
		seeds: {
			directory: __dirname + '/db/seeds/production'
		},
		userNullAsDefault: true
	}
}