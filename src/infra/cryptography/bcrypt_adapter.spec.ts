import bcrypt from 'bcrypt'
import { BCrypterAdapter } from './bcrypt_adapter'
import { Encrypter } from '../../data/protocols/encrypter'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve('hashed_password'))
  }
}))

const salt: number = 12
const makeSut = (): Encrypter => new BCrypterAdapter(salt)

describe('BCrypter Adapter', () => {
  it('should calls bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_password')
    expect(hashSpy).toHaveBeenCalledWith('any_password', salt)
  })

  it('should throws when bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.encrypt('any_password')
    await expect(promise).rejects.toThrow()
  })

  it('should return a hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.encrypt('any_password')
    expect(hash).toBe('hashed_password')
  })
})
