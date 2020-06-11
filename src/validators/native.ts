import { toType, toValidableType, isInteger } from '../utils'

export const any = () => toValidableType('any', {})

export const func = <T extends Function>() =>
  toValidableType<T>('function', {
    type: Function,
  })

export const bool = () =>
  toValidableType('boolean', {
    type: Boolean,
  })

export const string = () =>
  toValidableType('string', {
    type: String,
  })

export const number = () =>
  toValidableType('number', {
    type: Number,
  })

export const array = <T>() =>
  toValidableType<T[]>('array', {
    type: Array,
  })

export const object = <T extends { [key: string]: any }>() =>
  toValidableType<T>('object', {
    type: Object,
  })

export const integer = () =>
  toType('integer', {
    type: Number,
    validator(value) {
      return isInteger(value)
    },
  })

export const symbol = () =>
  toValidableType<symbol>('symbol', {
    validator(value) {
      return typeof value === 'symbol'
    },
  })
