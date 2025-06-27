import { EmailValidatorAdapter } from './email_validator_adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  }
}))

describe('Name of the group', () => {
  it('should return false when validator return false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@mail.com.br')
    expect(isValid).toBeFalsy()
  })

  it('should return true when validator return true', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('any_email@mail.com.br')
    expect(isValid).toBeTruthy()
  })

  it('should call validator is correct email', () => {
    const sut = new EmailValidatorAdapter()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@mail.com.br')
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com.br')
  })
})
