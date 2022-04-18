import { AppError } from '@shared/errors/AppError'
import { joiError } from '@shared/errors/JoiError'
import { Request, Response } from 'express'
import Joi from 'joi'
import { container } from 'tsyringe'
import { ListTodoUseCase } from './ListTodoUseCase'
import * as yup from 'yup'

export class ListTodosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, description } = request.query

    await Joi.object({
      title: Joi.string(),
      description: Joi.string()
    }).validateAsync(request.query, { abortEarly: false })
      .catch(err => { throw new AppError(joiError(err)) })

    const data = yup.object().shape({
      title: yup.string().optional(),
      description: yup.string().optional()
    }).cast({ title, description })

    const listTodosUseCase = container.resolve(ListTodoUseCase)

    const answer = await listTodosUseCase.execute(data)

    return response.json(answer)
  }
}
