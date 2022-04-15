import { ICreateUserDTO } from '@modules/Users/dtos/ICreateUserDTO'
import { IUsersRepository } from '@modules/Users/repositories/IUsersRepository'
import { prisma } from '@shared/infra/database/connection'
import { User } from '../entities/User'

export class UsersRepository implements IUsersRepository {
  async create({ email, password }: ICreateUserDTO): Promise<User> {
    const user = new User({ email, password })

    return await prisma.user.create({ data: user })
  }

  async findById(id: string): Promise<User> {
    return await prisma.user.findUnique({ where: { id } })
  }

  async findByEmail(email: string): Promise<User> {
    return await prisma.user.findUnique({ where: { email } })
  }
}
