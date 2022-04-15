import { ITodoRepository } from '@modules/ToDo/repositories/ITodoRepository'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ReadTodoUseCase {
  constructor (
    @inject('TodoRepository')
    private todoRepository: ITodoRepository
  ) {}

  async execute(todo_id: string, user_id: string) {
    const todo = await this.todoRepository.findById(todo_id, user_id)

    if (!todo) throw new AppError('ToDo not found', 404)

    return todo
  }
}
