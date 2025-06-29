import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  AddAccountRepository,
  Encrypter
} from './db_add_account_protocol'

export class DBAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}
  async add(account: AddAccountModel): Promise<AccountModel | null> {
    const hashedPassword = await this.encrypter.encrypt(account.password)
    const result = await this.addAccountRepository.add(
      Object.assign({}, account, { password: hashedPassword })
    )
    return result
  }
}
