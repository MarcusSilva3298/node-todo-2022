import { authConfig } from '@config/auth'
import { IUsersRepository } from '@modules/Users/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'
import { IBcryptProvider } from '@shared/providers/bcryptProvider/repositories/IBcryptProvider'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  email: string
  password: string
}

@injectable()
export class SingInUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('BcryptProvider')
    private bcryptProvider: IBcryptProvider
  ) {}

  async execute({ email, password }: IRequest) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) throw new AppError('Invalid Credentials', 401)

    const compareHash = await this.bcryptProvider.compareHash(password, user.password)

    if (!compareHash) throw new AppError('Invalid Credentials', 401)

    const token = sign({ user: { id: user.id } }, authConfig.jwt.secret)

    return {
      user,
      token
    }
  }
}
