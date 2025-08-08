import { Database } from "./database.js"
import { buildRoutePath } from "./utils/build-route-path.js"
import crypto from 'node:crypto'

const database = new Database()

export const routes = [
	{
		method: 'GET',
		path: buildRoutePath('/tasks'),
		handler: (req, res) => {
			const tasks = database.select('tasks')
			return res.end(JSON.stringify(tasks))
		}
	},
	{
		method: 'POST',
		path: buildRoutePath('/tasks'),
		handler: (req, res) => {
			const { title, description } = req.body

			if (!title || !description) 
				return res.writeHead(400).end(JSON.stringify({ error: 'Title and description are required!' }))

			const task = {
				id: crypto.randomUUID(),
				title,
				description,
				completed_at: null,
				created_at: new Date(),
				updated_at: new Date(),
			}

			database.insert('tasks', task)
			return res.writeHead(201).end(JSON.stringify(task))
		}
	},
	{
		method: 'PUT',
		path: buildRoutePath('/tasks/:id'),
		handler: (req, res) => {
			const { id } = req.params
			const { title, description } = req.body
			const [task] = database.select('tasks', { id })

			if (!task)
				return res.writeHead(404).end(JSON.stringify({ error: 'Task not found!' }))

			if (!title || !description) 
				return res.writeHead(400).end(JSON.stringify({ error: 'Title and description are required!' }))			

			database.update('tasks', id, {
				title,
				description,
				updated_at: new Date(),
			})
			return res.writeHead(204).end()
		}
	},
	{
		method: 'DELETE',
		path: buildRoutePath('/tasks/:id'),
		handler: (req, res) => {
			const { id } = req.params
			const [task] = database.select('tasks', { id })

			if (!task)
				return res.writeHead(404).end(JSON.stringify({ error: 'Task not found!' }))

			database.delete('tasks', id)
			return res.writeHead(204).end()
		}
	},
	{
		method: 'PATCH',
		path: buildRoutePath('/tasks/:id/complete'),
		handler: (req, res) => {
			const { id } = req.params

			const [task] = database.select('tasks', { id })

			if (!task)
				return res.writeHead(404).end(JSON.stringify({ error: 'Task not found!' }))

			if (task.completed_at !== null)
				return res.writeHead(400).end(JSON.stringify({ error: 'Task already completed!' }))

			database.update('tasks', id, {
				completed_at: new Date(),
			})
			return res.writeHead(204).end()
		}
	}
]
