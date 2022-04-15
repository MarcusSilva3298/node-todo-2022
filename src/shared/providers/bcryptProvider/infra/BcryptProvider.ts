import { compare, hash } from 'bcryptjs'
import { IBcryptProvider } from '../repositories/IBcryptProvider'

export class BcryptProvider implements IBcryptProvider {
  async hash(password: string): Promise<string> {
    return await hash(password, 8)
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash)
  }
}
