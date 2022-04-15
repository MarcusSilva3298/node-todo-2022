import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteTodoUseCase } from './DeleteTodoUseCase'

export class DeleteTodoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: todo_id } = request.params
    const { id: user_id } = request.user

    const deleteTodoUseCase = container.resolve(DeleteTodoUseCase)

    const answer = await deleteTodoUseCase.execute(todo_id, user_id)

    return response.json(answer)
  }
}
