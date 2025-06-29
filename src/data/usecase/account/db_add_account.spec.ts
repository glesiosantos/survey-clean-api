import { DBAddAccount } from '../../db/db_add_account'
import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  AddAccountRepository,
  Encrypter
} from '../../db/db_add_account_protocol'

type SutTypes = {
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
  sut: AddAccount
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
      return new Promise((resolve) =>
        resolve({
          id: 'id_valid',
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'hashed_password'
        })
      )
    }
  }
  return new AddAccountRepositoryStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DBAddAccount(encrypterStub, addAccountRepositoryStub)

  return { sut, encrypterStub, addAccountRepositoryStub }
}

describe('DDAddAccount usecase', () => {
  it('should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()

    const accountData = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('any_password')
  })

  it('should throws when Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()

    const accountData = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }

    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(() => {
      throw new Error('Erro simulado')
    })

    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  it('should calls AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    const accountData = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }

    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password'
    })
  })

  it('should throws when AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    const accountData = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }

    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(() => {
      throw new Error('Erro simulado')
    })

    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  it('should return an account when on success', async () => {
    const { sut } = makeSut()

    const accountData = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    const account = await sut.add(accountData)
    expect(account).toEqual({
      id: 'id_valid',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password'
    })
  })
})
