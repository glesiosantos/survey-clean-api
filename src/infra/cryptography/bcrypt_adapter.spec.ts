import bcrypt from 'bcrypt'
import { BCrypterAdapter } from './bcrypt_adapter'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve('hashed_password'))
  }
}))

describe('BCrypter Adapter', () => {
  it('should calls bcrypt with correct values', async () => {
    const salt: number = 12
    const sut = new BCrypterAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_password')
    expect(hashSpy).toHaveBeenCalledWith('any_password', salt)
  })

  it('should return a hash on success', async () => {
    const salt: number = 12
    const sut = new BCrypterAdapter(salt)
    const hash = await sut.encrypt('any_password')
    expect(hash).toBe('hashed_password')
  })
})
