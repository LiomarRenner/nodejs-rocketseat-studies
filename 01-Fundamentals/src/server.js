import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
// Notes are added at the end of the file

const server = http.createServer(async (req, res) => {
	const { method, url } = req

	await json(req, res)

	const route = routes.find(route => {
		return route.method === method && route.path === url
	})

	if (route) {
		return route.handler(req, res)
	}

	return res.writeHead(404).end('Not Found!')
})

server.listen(3333)

// FUNDAMENTALS NOTES

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