import { ToDo } from '@modules/ToDo/infra/entities/ToDo'
import { ITodoRepository } from '@modules/ToDo/repositories/ITodoRepository'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  user_id: string,
  title: string
  description?: string
}

@injectable()
export class CreateTodoUseCase {
  constructor (
    @inject('TodoRepository')
    private todoRepository: ITodoRepository
  ) {}

  async execute({ title, user_id, description }: IRequest): Promise<ToDo> {
    return await this.todoRepository.create({ title, user_id, description })
  }
}
