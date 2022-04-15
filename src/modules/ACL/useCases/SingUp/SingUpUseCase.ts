import { authConfig } from '@config/auth'
import { User } from '@modules/Users/infra/entities/User'
import { IUsersRepository } from '@modules/Users/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'
import { IBcryptProvider } from '@shared/providers/bcryptProvider/repositories/IBcryptProvider'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

@injectable()
export class SingUpUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('BcryptProvider')
    private bcryptProvider: IBcryptProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const emailInUse = await this.usersRepository.findByEmail(email)

    if (emailInUse) throw new AppError('Email already in use')

    const hashedPassword = await this.bcryptProvider.hash(password)

    const user = await this.usersRepository.create({ email, password: hashedPassword })

    const token = sign({ user: { id: user.id } }, authConfig.jwt.secret)

    return {
      user,
      token
    }
  }
}
