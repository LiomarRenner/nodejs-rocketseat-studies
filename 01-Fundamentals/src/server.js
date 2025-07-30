import http from 'node:http'

// GET => Search resource from the server
// POST => Create resource on the server
// PUT => Update resource on the server
// PATCH => Update part of a resource on the server
// DELETE => Remove resource from the server

// GET /users => List users
// POST /users => Create user

// Stateful vs Stateless
// Stateless: Each request is independent, no session state is stored on the server
// Stateful: The server maintains the state of the session across requests
// Example: HTTP is stateless, while WebSocket is stateful
// HTTP is a stateless protocol, meaning each request is independent and does not rely on previous requests.
// WebSocket, on the other hand, maintains a persistent connection allowing for stateful communication.

const users = []

const server = http.createServer((req, res) => {
    const { method, url } = req

    if (method === 'GET' && url === '/users') {
        return res.end('List users!')
    }

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