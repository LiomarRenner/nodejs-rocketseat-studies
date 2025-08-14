import type { FastifyInstance } from 'fastify';
import { dbKnex } from '../database.js';

export async function transactionsRoutes(app: FastifyInstance) {
	app.get('/hello', async () => {
		const transaction = await dbKnex('transactions').insert({
			id: crypto.randomUUID(),
			title: 'Test Transaction',
			amount: 1000,
		});

		return transaction;
	})
}