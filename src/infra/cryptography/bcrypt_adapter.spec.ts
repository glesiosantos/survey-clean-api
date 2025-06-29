import bcrypt from 'bcrypt'
import { BCrypterAdapter } from './bcrypt_adapter'

describe('BCrypter Adapter', () => {
  it('should calls bcrypt with correct values', async () => {
    const salt: number = 12
    const sut = new BCrypterAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_password')
    expect(hashSpy).toHaveBeenCalledWith('any_password', salt)
  })
})
