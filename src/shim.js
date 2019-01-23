import { setDefaults } from './sensibles'

const type = () => ({
  def (v) {
    this.default = v
    return this
  },
  get isRequired () {
    this.required = true
    return this
  },
  validator () { }
})

const vueTypes = setDefaults({
  utils: {
    toType: type,
    validate: () => true
  }
})

const createValidator = (root, name, getter = false) => {
  const prop = getter ? 'get' : 'value'
  const descr = { [prop]: () => type().def(getter ? vueTypes.sensibleDefaults[name] : undefined) }

  return Object.defineProperty(root, name, descr)
}

const getters = ['any', 'func', 'bool', 'string', 'number', 'array', 'object', 'integer', 'symbol']
const methods = ['oneOf', 'custom', 'instanceOf', 'oneOfType', 'arrayOf', 'objectOf']

getters.forEach((p) => createValidator(vueTypes, p, true))
methods.forEach((p) => createValidator(vueTypes, p, false))

Object.defineProperty(vueTypes, 'shape', {
  value () {
    return Object.defineProperty(type(), 'loose', {
      get () { return this },
      enumerable: false
    })
  }
})

export default vueTypes
