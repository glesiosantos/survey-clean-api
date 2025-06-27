import { EmailValidatorAdapter } from './email_validator_adapter'

describe('Name of the group', () => {
  it('should return false when validator return false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid_email@mail.com.br')
    expect(isValid).toBeFalsy()
  })
})
