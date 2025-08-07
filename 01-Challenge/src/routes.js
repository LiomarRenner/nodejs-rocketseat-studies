import { Database } from "./database.js"
import { buildRoutePath } from "./utils/build-route-path.js"
import crypto from 'node:crypto'

const database = new Database()

export const routes = []