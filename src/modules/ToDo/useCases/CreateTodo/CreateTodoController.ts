import { AppError } from '@shared/errors/AppError'
import { Request, Response } from 'express'
import Joi from 'joi'
import { container } from 'tsyringe'
import { CreateTodoUseCase } from './CreateTodoUseCase'

export class CreateTodoController {
  async handle(request: Request, response: Response) {
    const { title, description } = request.body

    await Joi.object({
      title: Joi.string().required(),
      description: Joi.string()
    }).validateAsync(request.body, { abortEarly: false })
      .catch(err => { throw new AppError(err) })

    const createTodoUseCase = container.resolve(CreateTodoUseCase)

    const answer = await createTodoUseCase.execute({ title, description })

    return response.json(answer)
  }
}
