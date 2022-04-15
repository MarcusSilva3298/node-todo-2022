import { Router } from 'express'
import { aclRoutes } from './acl.routes'
import { todoRoutes } from './todo.routes'

const routes = Router()

routes.use('/acl', aclRoutes)
routes.use('/todos', todoRoutes)
routes.get('/', (req, res) => { res.send('Hello World') })

export { routes }
