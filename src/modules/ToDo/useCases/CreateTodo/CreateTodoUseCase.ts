import { ToDo } from '@modules/ToDo/infra/entities/ToDo'
import { ITodoRepository } from '@modules/ToDo/repositories/ITodoRepository'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  title: string
  description?: string
}

@injectable()
export class CreateTodoUseCase {
  constructor (
    @inject('TodoRepository')
    private todoRepository: ITodoRepository
  ) {}

  async execute({ title, description }: IRequest): Promise<ToDo> {
    return await this.todoRepository.create({ title, description })
  }
}
