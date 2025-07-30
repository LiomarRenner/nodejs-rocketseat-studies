import http from 'node:http'

// GET => Search resource from the server
// POST => Create resource on the server
// PUT => Update resource on the server
// PATCH => Update part of a resource on the server
// DELETE => Remove resource from the server

// CRUD => Create, Read, Update, Delete
// REST => Representational State Transfer
// RESTful APIs are designed around resources, using standard HTTP methods to perform CRUD operations.

// HTTP is a protocol used for transferring data over the web.
// It defines how messages are formatted and transmitted, and how web servers and browsers should respond to various requests.

// WebSocket is a protocol providing full-duplex communication channels over a single TCP connection.
// It allows for real-time data transfer between a client and server, enabling features like live chat, notifications, and real-time updates.

// Stateful vs Stateless
// Stateless: Each request is independent, no session state is stored on the server
// Stateful: The server maintains the state of the session across requests
// Example: HTTP is stateless, while WebSocket is stateful
// HTTP is a stateless protocol, meaning each request is independent and does not rely on previous requests.
// WebSocket, on the other hand, maintains a persistent connection allowing for stateful communication.

// JSON - JavaScript Object Notation
// A lightweight data interchange format that is easy to read and write for humans and machines.

// GET /users => List users
// POST /users => Create user

// (Header) => Metadata about the request or response

const users = []

const server = http.createServer((req, res) => {
	const { method, url } = req

	if (method === 'GET' && url === '/users')
		return res
		  .setHeader('Content-Type', 'application/json')
			.end(users.length > 0 ? JSON.stringify(users) : 'No users found!')

	if (method === 'POST' && url === '/users') {
		users.push({
			id: 1,
			name: 'John Doe',
			email: 'johndoe@xample.com'
		}) // Simulating user creation
		return res.end('Create user!')
	}

	return res.end('Hello Dear!')
})

server.listen(3333)
