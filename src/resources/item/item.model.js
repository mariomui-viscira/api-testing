import mongoose from 'mongoose'
function createType(config, omits = []) {
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
const itemSchema = new mongoose.Schema({
  name: createType({ required: true }),

  status: createType(
    {
      required: true,
      enum: ['active', 'complete', 'pastdue'],
      default: 'active'
    },
    ['maxlength', 'trim']
  ),
  notes: String,
  due: Date,
  createdBy: createType(
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    },
    ['trim', 'maxlength']
  ),
  list: createType(
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'list',
      required: true
    },
    ['trim', 'maxlength']
  )
})

export const Item = mongoose.model('item', itemSchema)
