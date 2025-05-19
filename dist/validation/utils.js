import ConfirmationValidator from './validators/confirmation.js';
import CustomValidator from './validators/custom.js';
import EmailValidator from './validators/email.js';
import ExclusionValidator from './validators/exclusion.js';
import FileValidator from './validators/file.js';
import InclusionValidator from './validators/inclusion.js';
import LengthValidator from './validators/length.js';
import NumberValidator from './validators/number.js';
import PasswordValidator from './validators/password.js';
import PhoneValidator from './validators/phone.js';
import PresenceValidator from './validators/presence.js';
import RangeValidator from './validators/range.js';
import RegexValidator from './validators/regex.js';

function validator(...[type, options]) {
  if (type === 'confirmation') {
    return (binding, context) => new ConfirmationValidator(binding, options, context);
  }
  if (type === 'custom') {
    return (binding, context) => new CustomValidator(binding, options, context);
  }
  if (type === 'email') {
    return (binding, context) => new EmailValidator(binding, options, context);
  }
  if (type === 'exclusion') {
    return (binding, context) => new ExclusionValidator(binding, options, context);
  }
  if (type === 'file') {
    return (binding, context) => new FileValidator(binding, options, context);
  }
  if (type === 'inclusion') {
    return (binding, context) => new InclusionValidator(binding, options, context);
  }
  if (type === 'length') {
    return (binding, context) => new LengthValidator(binding, options, context);
  }
  if (type === 'number') {
    return (binding, context) => new NumberValidator(binding, options, context);
  }
  if (type === 'phone') {
    return (binding, context) => new PhoneValidator(binding, options, context);
  }
  if (type === 'presence') {
    return (binding, context) => new PresenceValidator(binding, options, context);
  }
  if (type === 'range') {
    return (binding, context) => new RangeValidator(binding, options, context);
  }
  if (type === 'regex') {
    return (binding, context) => new RegexValidator(binding, options, context);
  }
  if (type === 'password') {
    return (binding, context) => new PasswordValidator(binding, options, context);
  }
  throw new Error(`Unknown validator type: ${type}`);
}

export { validator };
//# sourceMappingURL=utils.js.map
