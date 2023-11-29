import { LocaleObject, setLocale as setLocaleYup } from "yup";

const mixed: LocaleObject["mixed"] = {
  default: (options) => ({key: 'yup.mixed.default', options}),
  required: (options) => ({key: 'yup.mixed.required', options}),
  oneOf: (options) => ({key: 'yup.mixed.oneOf', options}),
  notOneOf: (options) => ({key: 'yup.mixed.notOneOf', options}),
  notType: (options) => ({key: 'yup.mixed.notType', options}),
  notNull: (options) => ({key: 'yup.mixed.notNull', options}),
  defined: (options) => ({key: 'yup.mixed.defined', options}),
}


const string: LocaleObject["string"] = {
  length: (options) => ({key: 'yup.string.length', options}),
  min: (options) => ({key: 'yup.string.min', options}),
  max: (options) => ({key: 'yup.string.max', options}),
  matches: (options) => ({key: 'yup.string.matches', options}),
  email: (options) => ({key: 'yup.string.email', options}),
  url: (options) => ({key: 'yup.string.url', options}),
  trim: (options) => ({key: 'yup.string.trim', options}),
  lowercase: (options) => ({key: 'yup.string.lowercase', options}),
  uppercase: (options) => ({key: 'yup.string.uppercase', options}),
}

const number: LocaleObject["number"] = {
  min: (options) => ({key: 'yup.number.min', options}),
  max: (options) => ({key: 'yup.number.max', options}),
  lessThan: (options) => ({key: 'yup.number.lessThan', options}),
  moreThan: (options) => ({key: 'yup.number.moreThan', options}),
  positive: (options) => ({key: 'yup.number.positive', options}),
  negative: (options) => ({key: 'yup.number.negative', options}),
  integer: (options) => ({key: 'yup.number.integer', options}),
}

const date: LocaleObject["date"] = {
  min: (options) => ({key: 'yup.date.min', options}),
  max: (options) => ({key: 'yup.date.max', options}),
}

const boolean: LocaleObject["boolean"] = {
  isValue: (options) => ({key: 'yup.boolean.isValue', options})
}

const object: LocaleObject["object"] = {
  noUnknown: (options) => ({key: 'yup.object.noUnknown', options})
}

const array: LocaleObject["array"] = {
  min: (options) => ({key: 'yup.array.min', options}),
  max: (options) => ({key: 'yup.array.max', options}),
}


const localeObject: LocaleObject = {
  mixed,
  string,
  number,
  date,
  boolean,
  object,
  array,
}

export function setLocalizedLocale() {
  setLocaleYup(localeObject)
}
