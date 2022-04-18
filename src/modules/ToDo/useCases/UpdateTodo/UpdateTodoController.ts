import { AppError } from '@shared/errors/AppError'
import { Request, Response } from 'express'
import Joi from 'joi'
import { container } from 'tsyringe'
import { UpdateTodoUseCase } from './UpdateTodoUseCase'

export class UpdateTodoController {
  async handle(request: Request, response: Response) {
    const { title, description, done } = request.body
    const { id: todo_id } = request.params

    await Joi.object({
      title: Joi.string(),
      description: Joi.string(),
      done: Joi.boolean()
    }).validateAsync(request.body, { abortEarly: false })
      .catch(err => { throw new AppError(err) })

    const createTodoUseCase = container.resolve(UpdateTodoUseCase)

    const answer = await createTodoUseCase.execute({ title, description, todo_id, done })

    return response.json(answer)
  }
}
