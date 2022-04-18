import { CreateTodoController } from '@modules/ToDo/useCases/CreateTodo/CreateTodoController'
import { DeleteTodoController } from '@modules/ToDo/useCases/DeleteTodo/DeleteTodoController'
import { ListTodosController } from '@modules/ToDo/useCases/ListTodos/ListTodosController'
import { UpdateTodoController } from '@modules/ToDo/useCases/UpdateTodo/UpdateTodoController'
import { Router } from 'express'

const todoRoutes = Router()

const createTodoController = new CreateTodoController()
const listTodoController = new ListTodosController()
const deleteTodoController = new DeleteTodoController()
const updateTodoController = new UpdateTodoController()

todoRoutes.get('/', listTodoController.handle)
todoRoutes.post('/', createTodoController.handle)
todoRoutes.delete('/:id', deleteTodoController.handle)
todoRoutes.patch('/:id', updateTodoController.handle)

export { todoRoutes }
