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

function validator(...[type, options, context]) {
  if (type === 'confirmation') {
    return confirmation(options, context);
  }
  if (type === 'custom') {
    return custom(options, context);
  }
  if (type === 'email') {
    return email(options, context);
  }
  if (type === 'exclusion') {
    return exclusion(options, context);
  }
  if (type === 'file') {
    return file(options, context);
  }
  if (type === 'inclusion') {
    return inclusion(options, context);
  }
  if (type === 'length') {
    return length(options, context);
  }
  if (type === 'number') {
    return number(options, context);
  }
  if (type === 'phone') {
    return phone(options, context);
  }
  if (type === 'presence') {
    return presence(options, context);
  }
  if (type === 'range') {
    return range(options, context);
  }
  if (type === 'regex') {
    return regex(options, context);
  }
  if (type === 'password') {
    return password(options, context);
  }
  throw new Error(`Unknown validator type: ${type}`);
}
function confirmation(options, context) {
  return binding => new ConfirmationValidator(binding, options, context);
}
function custom(options, context) {
  return binding => new CustomValidator(binding, options, context);
}
function email(options, context) {
  return binding => new EmailValidator(binding, options, context);
}
function exclusion(options, context) {
  return binding => new ExclusionValidator(binding, options, context);
}
function file(options, context) {
  return binding => new FileValidator(binding, options, context);
}
function inclusion(options, context) {
  return binding => new InclusionValidator(binding, options, context);
}
function length(options, context) {
  return binding => new LengthValidator(binding, options, context);
}
function number(options, context) {
  return binding => new NumberValidator(binding, options, context);
}
function password(options, context) {
  return binding => new PasswordValidator(binding, options, context);
}
function phone(options, context) {
  return binding => new PhoneValidator(binding, options, context);
}
function presence(options, context) {
  return binding => new PresenceValidator(binding, options, context);
}
function range(options, context) {
  return binding => new RangeValidator(binding, options, context);
}
function regex(options, context) {
  return binding => new RegexValidator(binding, options, context);
}

export { confirmation, custom, email, exclusion, file, inclusion, length, number, password, phone, presence, range, regex, validator };
//# sourceMappingURL=utils.js.map
