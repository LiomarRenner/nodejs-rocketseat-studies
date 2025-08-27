import { test, beforeAll, afterAll } from 'vitest';
import requestSupertest from 'supertest';
import { app } from '../src/app.js';

beforeAll(async () => {
	await app.ready();
});

afterAll(async () => {
	await app.close();
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