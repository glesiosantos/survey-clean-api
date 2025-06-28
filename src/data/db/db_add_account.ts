import { AccountModel } from '../../domain/models/account_model'
import {
  AddAccount,
  AddAccountModel
} from '../../domain/usecases/account/add_account'
import { Encrypter } from '../protocol/encrypter'

export class DBAddAccount implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {}
  async add(account: AddAccountModel): Promise<AccountModel | null> {
    this.encrypter.encrypt(account.password)
    return new Promise((resolve) => resolve(null))
  }
}
