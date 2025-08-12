import fastify from 'fastify';
import { dbKnex } from './database.js';

const app = fastify()

// GET, POST, PUT, DELETE, PATCH
app.get('/hello', async () => {
  const tables = await dbKnex('sqlite_schema').select('*')
  return tables
})

app.listen({ port: 3333 }).then(() => {
  console.log('Server is running on http://localhost:3333')
})
