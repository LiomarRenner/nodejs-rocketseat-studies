import { env } from './env/index.js';
import knex from 'knex';
import type { Knex } from 'knex';

export const config: Knex.Config = {
	client: env.DATABASE_CLIENT,
	connection: env.DATABASE_CLIENT === 'pg' ? env.DATABASE_URL : {
		filename: env.DATABASE_URL,
	},
	useNullAsDefault: true,
	migrations: {
		extension: 'ts',
		directory: './db/migrations',
	}
};

export const dbKnex = knex(config);