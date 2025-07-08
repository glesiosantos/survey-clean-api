import { AccountModel } from '../../domain/models/account_model.ts'
import { AddAccountModel } from '../../domain/usecases/account/add_account.ts'

export interface AddAccountRepository {
  add(accountData: AddAccountModel): Promise<AccountModel>
}
