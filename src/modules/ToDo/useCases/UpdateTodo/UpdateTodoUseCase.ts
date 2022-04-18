import { ToDo } from '@modules/ToDo/infra/entities/ToDo'
import { ITodoRepository } from '@modules/ToDo/repositories/ITodoRepository'
import { AppError } from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'

interface IRequest {
  todo_id: string
  title?: string
  description?: string
  done?: boolean
}

@injectable()
export class UpdateTodoUseCase {
  constructor (
    @inject('TodoRepository')
    private todoRepository: ITodoRepository
  ) {}

  async execute({ title, description, todo_id, done }: IRequest): Promise<ToDo> {
    const todo = this.todoRepository.findById(todo_id)

    if (!todo) throw new AppError('ToDo not found')

    return await this.todoRepository.update({ title, description, todo_id, done })
  }
}
