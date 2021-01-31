import { EmailValidatorAdapter } from '@/infra/validators'
import { RequiredFieldValidation, Validation, ValidationComposite , CompareFieldsValidation } from '@/presentation/helpers'
import { EmailValidation } from '@/presentation/helpers/email-validation'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
