import { EmailValidatorAdapter } from '../../utils/email_validator_adapter.ts'
import { SignUpController } from '../../presentation/controllers/signup/signup_controller.ts'
import { Controller } from '../../presentation/protocols/controller.ts'
import { DBAddAccount } from '../../data/db/db_add_account.ts'
import { BCrypterAdapter } from '../../infra/cryptography/bcrypt_adapter.ts'
import { AccountMongoRepository } from '../../infra/db/mongodb/account_mongo_repository.ts'

export const makeSignUpFController = (): Controller => {
  const emailValidator = new EmailValidatorAdapter()
  const encrypter = new BCrypterAdapter(12)
  const accountRepository = new AccountMongoRepository()
  const addAccount = new DBAddAccount(encrypter, accountRepository)
  return new SignUpController(emailValidator, addAccount)
}
