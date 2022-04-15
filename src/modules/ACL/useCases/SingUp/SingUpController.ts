import { AppError } from '@shared/errors/AppError'
import { joiError } from '@shared/errors/JoiError'
import { Request, Response } from 'express'
import Joi from 'joi'
import { container } from 'tsyringe'
import { SingUpUseCase } from './SingUpUseCase'

export class SingUpController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    await Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required()
      // .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g)
    }).validateAsync(request.body, { abortEarly: false })
      .catch(err => { throw new AppError(joiError(err)) })

    const singUpUseCase = container.resolve(SingUpUseCase)

    const answer = await singUpUseCase.execute({ email, password })

    return response.json(answer)
  }
}
