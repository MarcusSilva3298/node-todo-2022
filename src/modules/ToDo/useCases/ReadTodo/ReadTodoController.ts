import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ReadTodoUseCase } from './ReadTodoUseCase'

export class ReadTodoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: todo_id } = request.params
    const { id: user_id } = request.user

    const readTodoUseCase = container.resolve(ReadTodoUseCase)

    const answer = await readTodoUseCase.execute(todo_id, user_id)

    return response.json(answer)
  }
}
