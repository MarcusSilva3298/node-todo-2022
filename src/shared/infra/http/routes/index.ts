import { Router } from 'express'
import { todoRoutes } from './todo.routes'

const routes = Router()

routes.use('/todos', todoRoutes)
routes.get('/', (req, res) => { res.send('Hello World') })

export { routes }
