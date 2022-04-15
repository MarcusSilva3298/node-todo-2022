import { CreateTodoController } from '@modules/ToDo/useCases/CreateTodo/CreateTodoController'
import { DeleteTodoController } from '@modules/ToDo/useCases/DeleteTodo/DeleteTodoController'
import { ListTodosController } from '@modules/ToDo/useCases/ListTodos/ListTodosController'
import { ReadTodoController } from '@modules/ToDo/useCases/ReadTodo/ReadTodoController'
import { Router } from 'express'
import { ensureAuth } from '../middlewares/ensureAuth'

const todoRoutes = Router()

const createTodoController = new CreateTodoController()
const listTodoController = new ListTodosController()
const readTodoController = new ReadTodoController()
const deleteTodoController = new DeleteTodoController()

todoRoutes.get('/', ensureAuth, listTodoController.handle)
todoRoutes.get('/:id', ensureAuth, readTodoController.handle)
todoRoutes.post('/', ensureAuth, createTodoController.handle)
todoRoutes.delete('/:id', ensureAuth, deleteTodoController.handle)

export { todoRoutes }
