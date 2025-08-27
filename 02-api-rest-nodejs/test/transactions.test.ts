import { test, beforeAll, afterAll, describe, expect, beforeEach } from 'vitest';
import { execSync } from 'node:child_process';
import requestSupertest from 'supertest';
import { app } from '../src/app.js';

describe('Transactions routes', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	beforeEach(async () => {
		execSync('npm run knex -- migrate:rollback --all');
		execSync('npm run knex -- migrate:latest');
	});
	test('user create new transaction', async () => {
		await requestSupertest(app.server)
			.post('/transactions')
			.send({
				title: 'New transaction',
				amount: 5000,
				type: 'credit',
			})
			.expect(201);
	});

	test('user get all transactions', async () => {
		const createTransactionResponse = await requestSupertest(app.server)
			.post('/transactions')
			.send({
				title: 'New transaction',
				amount: 5000,
				type: 'credit',
			})

		const cookies = createTransactionResponse.get('Set-Cookie');

		if (!cookies) {
			throw new Error('No cookies found');
		}

		const listTransactionsResponse = await requestSupertest(app.server)
			.get('/transactions')
			.set('Cookie', cookies)
			.expect(200);

		expect(listTransactionsResponse.body.transactions).toEqual([
			expect.objectContaining({
				title: 'New transaction',
				amount: 5000,
			}),
		]);
	});

	test('user get a specific transaction', async () => {
		const createTransactionResponse = await requestSupertest(app.server)
			.post('/transactions')
			.send({
				title: 'New transaction',
				amount: 5000,
				type: 'credit',
			})

		const cookies = createTransactionResponse.get('Set-Cookie');

		if (!cookies) {
			throw new Error('No cookies found');
		}

		const listTransactionsResponse = await requestSupertest(app.server)
			.get('/transactions')
			.set('Cookie', cookies)
			.expect(200);

		const transactionId = listTransactionsResponse.body.transactions[0].id;

		const getTransactionResponse = await requestSupertest(app.server)
			.get(`/transactions/${transactionId}`)
			.set('Cookie', cookies)
			.expect(200);

		expect(getTransactionResponse.body.transaction).toEqual(
			expect.objectContaining({
				title: 'New transaction',
				amount: 5000,
			}),
		);
	});

	test('user get transactions summary', async () => {
		const createTransactionResponse = await requestSupertest(app.server)
			.post('/transactions')
			.send({
				title: 'Credit transaction',
				amount: 5000,
				type: 'credit',
			})

		const cookies = createTransactionResponse.get('Set-Cookie');

		if (!cookies) {
			throw new Error('No cookies found');
		}

		await requestSupertest(app.server)
			.post('/transactions')
			.set('Cookie', cookies)
			.send({
				title: 'Debit transaction',
				amount: 2000,
				type: 'debit',
			})

		const summaryResponse = await requestSupertest(app.server)
			.get('/transactions/summary')
			.set('Cookie', cookies)
			.expect(200);

		expect(summaryResponse.body.summary).toEqual(
			expect.objectContaining({
				amount: 3000,
			}),
		);
	});
});
