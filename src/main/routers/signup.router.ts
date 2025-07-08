import { Router } from 'express'
import { adapterRoute } from '../adapter/express_route_adapter.ts'
import { makeSignUpFController } from '../factory/sign_up_factory.ts'

export default (router: Router): void => {
  router.post('/signup', adapterRoute(makeSignUpFController()))
}
