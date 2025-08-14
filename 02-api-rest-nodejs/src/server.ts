import fastify from 'fastify';
import { env } from './env/index.js';
import { transactionsRoutes } from './routes/transactions.js';

const app = fastify()

app.register(transactionsRoutes, {
  prefix: 'transactions',
})

app.listen({ port: env.PORT }).then(() => {
  console.log('Server is running on http://localhost:3333')
})
