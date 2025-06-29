import bcrypt from 'bcrypt'
import { Encrypter } from '../../data/protocols/encrypter'

export class BCrypterAdapter implements Encrypter {
  constructor(private readonly salt: number = 12) {}

  async encrypt(value: string): Promise<string | null> {
    const hashed = await bcrypt.hash(value, this.salt)
    return hashed
  }
}
