import { DBAddAccount } from '../../db/db_add_account'
import { Encrypter } from '../../protocol/encrypter'

describe('DDAddAccount usecase', () => {
  it('should call Encrypter with correct password', () => {
    class EncrypterStub implements Encrypter {
      encrypt(value: string): Promise<string> {
        return new Promise((resolve) => resolve('hashed_password'))
      }
    }

    const encrypterStub = new EncrypterStub()
    const sut = new DBAddAccount(encrypterStub)

    const accountData = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('any_password')
  })
})
