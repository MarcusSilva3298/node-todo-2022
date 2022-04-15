import { TodoRepository } from '@modules/ToDo/infra/repositories/TodoRepository'
import { ITodoRepository } from '@modules/ToDo/repositories/ITodoRepository'
import { UsersRepository } from '@modules/Users/infra/repositories/UsersRepository'
import { IUsersRepository } from '@modules/Users/repositories/IUsersRepository'
import { BcryptProvider } from '@shared/providers/bcryptProvider/infra/BcryptProvider'
import { IBcryptProvider } from '@shared/providers/bcryptProvider/repositories/IBcryptProvider'
import { container } from 'tsyringe'

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)

container.registerSingleton<IBcryptProvider>('BcryptProvider', BcryptProvider)

container.registerSingleton<ITodoRepository>('TodoRepository', TodoRepository)
