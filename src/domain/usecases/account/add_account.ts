import { AccountModel } from '../../models/account_model.ts'

export type AddAccountModel = {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add(account: AddAccountModel): Promise<AccountModel | null>
}
