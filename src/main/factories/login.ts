import env from '@/main/config/env'
import { LoginController } from '@/presentation/controller/login/login-controller'
import { DbAuthentication } from '@/data/usecases/authentication/db-authentication'
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography'
import { AccountMongoRepository } from '@/infra/db'
import { makeLoginValidation } from './login-validation'

export const makeLoginController = (): LoginController => {
  const salt = 12
  const hashComparer = new BcryptAdapter(salt)
  const tokenGenerator = new JwtAdapter(env.secret)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAuthentication = new DbAuthentication(accountMongoRepository, hashComparer, tokenGenerator, accountMongoRepository)
  return new LoginController(dbAuthentication, makeLoginValidation())
}
