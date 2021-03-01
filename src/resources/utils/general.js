export function createType(config, omits = []) {
  const defaults = {
    type: String,
    required: false,
    trim: true,
    maxlength: 50
  }
  const processedDefaults = {}
  let result = {}
  if (omits.length) {
    Object.keys(defaults).reduce((accum, item) => {
      if (omits.indexOf(item) > -1) {
        return accum
      } else {
        accum[item] = defaults[item]
        return accum
      }
    }, processedDefaults)

    result = { ...processedDefaults, ...config }
  } else {
    result = { ...defaults, ...config }
  }

  return result
}
