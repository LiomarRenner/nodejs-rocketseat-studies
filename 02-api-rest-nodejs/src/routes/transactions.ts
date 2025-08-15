import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { dbKnex } from '../database.js';
// Cookies <-> Way to keep context between requests
export async function transactionsRoutes(app: FastifyInstance) {
	app.get('/', async () => {
		const transactions = await dbKnex('transactions').select('*');
		return {
			transactions,
		};
	})

	app.get('/:id', async (request) => {
		const getTransactionParamsSchema = z.object({
			id: z.uuid(),
		});

		const { id } = getTransactionParamsSchema.parse(request.params);

		const transaction = await dbKnex('transactions').where('id', id).first();

		return {
			transaction,
		};
	})

	app.get('/summary', async () => {
		const summary = await dbKnex('transactions')
			.sum('amount', { as: 'amount' })
			.first();

		return {
			summary,
		};
	})

	app.post('/', async (request, reply) => {
		const createTransactionBodySchema = z.object({
			title: z.string(),
			amount: z.number(),
			type: z.enum(['credit', 'debit']),
		});

		const { title, amount, type } = createTransactionBodySchema.parse(request.body);

		await dbKnex('transactions').insert({
			id: crypto.randomUUID(),
			title,
			amount: type === 'credit' ? amount : -amount,
		});

		return reply.status(201).send();
	})
}