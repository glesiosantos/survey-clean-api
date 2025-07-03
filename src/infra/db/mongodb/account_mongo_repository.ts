import { AddAccountModel } from '../../../data/db/db_add_account_protocol.ts'
import { AddAccountRepository } from '../../../data/protocols/add_account_repository.ts'
import { AccountModel } from '../../../domain/models/account_model.ts'
import { MongoHelper } from './helper/mongo_helper.ts'

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const { insertedId } = await accountCollection.insertOne(accountData)
    const data = await accountCollection.findOne<AccountModel>({
      _id: insertedId
    })

    return MongoHelper.map(data)
  }
}
