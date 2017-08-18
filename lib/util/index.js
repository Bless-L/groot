function type (arg) {
  const class2type = {}
  const toString = class2type.toString
  const types = 'Boolean Number String Function Array Date RegExp Object Error'.split(' ')
  for (let i = 0; i < types.length; i++) {
    const typeItem = types[i]
    class2type['[object ' + typeItem + ']'] = typeItem.toLowerCase()
  }

  if (arg === null) {
    return arg + ''
  }

  return (typeof arg === 'object' || typeof arg === 'function')
    ? class2type[toString.call(arg)] || 'object'
    : typeof arg
}

exports.isObject = (arg) => {
  return type(arg) === 'object'
}

exports.isString = (arg) => {
  return type(arg) === 'string'
}

exports.isFunction = (arg) => {
  return type(arg) === 'function'
}

exports.isArray = (arg) => {
  return type(arg) === 'array'
}