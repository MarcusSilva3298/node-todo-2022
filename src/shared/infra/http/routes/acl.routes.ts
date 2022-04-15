import { SingInController } from '@modules/ACL/useCases/SingIn/SingInController'
import { SingUpController } from '@modules/ACL/useCases/SingUp/SingUpController'
import { Router } from 'express'

const aclRoutes = Router()

const singUpController = new SingUpController()
const singInController = new SingInController()

aclRoutes.post('/singup', singUpController.handle)
aclRoutes.post('/singin', singInController.handle)

export { aclRoutes }
