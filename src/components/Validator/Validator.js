import * as EmailValidator from 'email-validator';

export const isEmail = value => EmailValidator.validate(value);
export const isRequired = value => value && !!value.replace(/^\s+/g, '').length;

export const isValid = (rules, value) => rules.filter(rule => !rule(value)).length === 0;
