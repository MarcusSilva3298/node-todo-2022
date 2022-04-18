import { TodoRepository } from '@modules/ToDo/infra/repositories/TodoRepository'
import { ITodoRepository } from '@modules/ToDo/repositories/ITodoRepository'
import { container } from 'tsyringe'

container.registerSingleton<ITodoRepository>('TodoRepository', TodoRepository)
