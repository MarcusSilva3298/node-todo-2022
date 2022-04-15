import { AppError } from '@shared/errors/AppError'
import { joiError } from '@shared/errors/JoiError'
import { Request, Response } from 'express'
import Joi from 'joi'
import { container } from 'tsyringe'
import { SingInUseCase } from './SingInUseCase'

export class SingInController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    await Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required()
    }).validateAsync(request.body, { abortEarly: false })
      .catch(err => { throw new AppError(joiError(err)) })

    const singInUseCase = container.resolve(SingInUseCase)

    const answer = await singInUseCase.execute({ email, password })

    return response.json(answer)
  }
}
