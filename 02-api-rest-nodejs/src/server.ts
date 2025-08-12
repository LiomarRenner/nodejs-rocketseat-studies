import fastify from 'fastify';
import { dbKnex } from './database.js';
import { env } from './env/index.js';

const app = fastify()

// GET, POST, PUT, DELETE, PATCH
app.get('/hello', async () => {
  const transaction = await dbKnex('transactions').insert({
    id: crypto.randomUUID(),
    title: 'Test Transaction',
    amount: 1000,
  });

  return transaction;
})

app.listen({ port: env.PORT }).then(() => {
  console.log('Server is running on http://localhost:3333')
})
